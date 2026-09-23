import { getDefaultClassNames } from "react-day-picker";
export const getDayPickerStyles = (botType) => {
    const defaultClassNames = getDefaultClassNames();
    const botTypeMapNav = {
        mobile: "inv-date-picker-nav-mobile",
        fullscreen: "inv-date-picker-nav-fullscreen",
        tray: "inv-date-picker-nav-tray",
        copilot: "inv-date-picker-nav-copilot",
    };
    const botTypeMapDropdowns = {
        mobile: "inv-date-picker-dropdowns-mobile",
        fullscreen: "inv-date-picker-dropdowns-fullscreen",
        tray: "inv-date-picker-dropdowns-tray",
        copilot: "inv-date-picker-dropdowns-copilot",
    };
    const commonClassNames = {
        root: `${defaultClassNames.root} inv-date-picker-root`,
        nav: `${defaultClassNames.nav} ${botTypeMapNav[botType]}`,
        dropdowns: `${defaultClassNames.dropdowns} ${botTypeMapDropdowns[botType]}`,
        month_caption: `inv-date-picker-month-caption`,
        month_grid: `inv-date-picker-month-grid`,
        button_next: `inv-date-picker-button-next`,
        button_previous: `inv-date-picker-button-previous`,
        today: `inv-date-picker-today`,
        disabled: `inv-date-picker-disabled`,
        weekdays: `inv-date-picker-weekdays`,
        weekday: `inv-date-picker-weekday`,
        chevron: `inv-date-picker-chevron`,
        month: `inv-date-picker-month`,
        months_dropdown: `inv-date-picker-months-dropdown`,
        years_dropdown: `inv-date-picker-years-dropdown`,
    };
    const DateSingleClasses = {
        ...commonClassNames,
        day_button: "inv-date-picker-single-day-button",
        day: "inv-date-picker-single-day",
        selected: "inv-date-picker-single-day-selected",
    };
    const DateRangeClasses = {
        ...commonClassNames,
        selected: "",
        range_start: "inv-date-picker-range-start",
        range_middle: "inv-date-picker-range-middle",
        range_end: "inv-date-picker-range-end",
        day_button: "inv-date-picker-range-day-button",
        day: "inv-date-picker-range-day",
    };
    return {
        DateSingleClasses,
        DateRangeClasses,
    };
};
//# sourceMappingURL=styles.js.map