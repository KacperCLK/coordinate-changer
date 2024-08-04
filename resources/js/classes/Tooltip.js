class Tooltip {
    static positionTooltip(tooltip, tooltipText) {
        var rect = tooltip.getBoundingClientRect();
        var tooltipHeight = tooltipText.offsetHeight;

        if (rect.top < tooltipHeight + 10) {
            tooltipText.style.top = '125%';
            tooltipText.style.bottom = 'auto';
            tooltipText.classList.remove('top');
            tooltipText.classList.add('bottom');
        } else {
            tooltipText.style.bottom = '125%';
            tooltipText.style.top = 'auto';
            tooltipText.classList.remove('bottom');
            tooltipText.classList.add('top');
        }
    }

    static initialize() {
        document.querySelectorAll('.tooltip-hover').forEach(function (tooltip) {
            tooltip.addEventListener('mouseover', function () {
                var tooltipText = this.querySelector('.tooltiptext');
                Tooltip.positionTooltip(this, tooltipText);
                this.classList.add('show');
            });

            tooltip.addEventListener('mouseout', function () {
                this.classList.remove('show');
            });
        });

        document.querySelectorAll('.tooltip-click').forEach(function (tooltip) {
            tooltip.addEventListener('click', function () {
                var tooltipText = this.querySelector('.tooltiptext');
                Tooltip.positionTooltip(this, tooltipText);
                this.classList.toggle('show');
            });

            document.addEventListener('click', function (event) {
                if (!tooltip.contains(event.target)) {
                    tooltip.classList.remove('show');
                }
            });
        });

        document.querySelectorAll('.tooltip-click-and-fade').forEach(function (tooltip) {
            tooltip.addEventListener('click', function () {
                var tooltipText = this.querySelector('.tooltiptext');
                Tooltip.positionTooltip(this, tooltipText);
                this.classList.add('show');

                setTimeout(() => {
                    this.classList.add('fade');
                }, 1000);

                setTimeout(() => {
                    this.classList.remove('show');
                    this.classList.remove('fade');
                }, 2000);
            });

            document.addEventListener('click', function (event) {
                if (!tooltip.contains(event.target)) {
                    tooltip.classList.remove('show');
                    tooltip.classList.remove('fade');
                }
            });
        });
    }
}

export default Tooltip;
