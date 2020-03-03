app.component('datePicker', {
    transclude: true,
    templateUrl: 'Components/DatePicker/index.html',
    controller: function () {
        $(document).on('click', '.date-picker-days-day', function () {
            document.body.addEventListener();

        });
        this.weekDay = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        this.start = 0;
        this.first = null;
        this.end = null;
        this.hover = null;
        this.lang = 'en';
        let tooltip = false;
        const today = moment();
        const month = moment(today.format('YYYY/MM/01'), 'YYYY/MM/DD');
        const jMonth = moment(today.format('jYYYY/jMM/01'), 'jYYYY/jMM/DD');
        const convert = (1000 * 60 * 60 * 24);
        const monthsName = {
            fa: [],
            en: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
        };
        this.new_month = function () {
            if (this.value && this.first === null) {
                this.first = moment(this.value[0], "YYYY/MM/DD");
                this.end = moment(this.value[1], "YYYY/MM/DD");
                const year = this.first.year() - today.year();
                const month = this.first.month() - today.month();
                this.start = Math.floor((year * 365) / 30) + month;
            }
            this.months = [];
            for (let m = 0; m < 2; m++) {

                const days = [];
                const date = moment(month).add(this.start + m, 'month');
                const weekDay = date.day();
                for (let day = 1; day <= moment.jDaysInMonth(date.format('jYYYY,jMM'), 'YYYY/MM/DD') + weekDay; day++) {
                    days.push({
                        text: weekDay >= day ? '' : day - weekDay,
                        data: weekDay >= day ? null : moment(date.format('YYYY/MM/' + (day - weekDay)), "YYYY/MM/DD")
                    });
                }
                this.months.push({
                    name: monthsName['en'][date.month()], days: days,
                    button: m ? "fa fa-arrow-circle-o-right" : "fa fa-arrow-circle-o-left"
                })
            }
        };
        this.change_start = function (index) {
            if (index)
                this.start += 1;
            else
                this.start -= 1;
            this.new_month();
        };
        this.onHover = function (data, event) {
            if (data.day.text === '')
                return false;
            if (tooltip) {
                tooltip.remove();
                tooltip = false;
                this.hover = null;
                return true;
            }
            const target = event.target;
            const offset = $(target).offset();
            tooltip = document.createElement('span');
            tooltip.className = "date-picker-tooltip";
            if (this.first === null)
                tooltip.innerHTML = "start in";
            else if (this.end === null)
                tooltip.innerHTML = `return ${Math.floor((data.day.data - this.first) / convert)} days later`;
            else if (data.day.data > this.first && data.day.data < this.end)
                tooltip.innerHTML = `after ${Math.floor((data.day.data - this.first) / convert)} days`;
            document.body.append(tooltip);
            tooltip.style.left = offset.left + $(target).width() / 2 + 'px';
            tooltip.style.top = offset.top - tooltip.offsetHeight - 12 + 'px';
            this.hover = data.day.data;

        };
        this.select = function (data) {

            const date = data.day.data;
            if (date < today - convert)
                return '';
            else if (this.first === null)
                this.first = data.day.data;
            else if (this.end === null && Math.floor((data.day.data - this.first) / convert) <= 30) {
                this.end = data.day.data;
                this.onSelect(this.first, this.end);
            } else if (this.end !== null && date > today - convert) {
                this.first = date;
                this.end = null;
            }
        };
        this.getClass = function (data) {
            const date = data.day.data;
            if (data.day.text === '' || date === null)
                return '';
            else if (this.first !== null && date.year() === this.first.year() && date.month() === this.first.month() &&
                date.date() === this.first.date())
                return 'date-picker-day-first';
            else if ((this.first !== null) && ((date > this.first && date < this.end)
                || (this.end === null && date > this.first && date < this.hover)))
                return 'date-picker-day-mid';
            else if ((this.end !== null && date.year() === this.end.year() && date.month() === this.end.month() &&
                date.date() === this.end.date() || (this.hover === date && this.end === null)) && this.first !== null)
                return 'date-picker-day-end';
            else if (date < today - convert || (this.first && Math.floor((date - this.first) / convert)) > 30 && this.end === null)
                return "date-picker-day-hatchet"

        }


    },
    bindings: {
        value: '=',
        onSelect: '=',
    }
});
