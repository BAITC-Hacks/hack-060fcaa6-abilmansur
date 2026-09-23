import { getDefaultClassNames } from "react-day-picker";
export const getDayPickerStyles = (botType) => {
    const defaultClassNames = getDefaultClassNames();
    const botTypeMapNav = {
        mobile: "inv-calendar-nav-mobile",
        fullscreen: "inv-calendar-nav-fullscreen",
        tray: "inv-calendar-nav-tray",
        copilot: "inv-calendar-nav-copilot",
    };
    const botTypeMapDropdowns = {
        mobile: "inv-calendar-dropdowns-mobile",
        fullscreen: "inv-calendar-dropdowns-fullscreen",
        tray: "inv-calendar-dropdowns-tray",
        copilot: "inv-calendar-dropdowns-copilot",
    };
    const commonClassNames = {
        root: `${defaultClassNames.root} inv-calendar-root`,
        nav: `${defaultClassNames.nav} ${botTypeMapNav[botType]}`,
        dropdowns: `${defaultClassNames.dropdowns} ${botTypeMapDropdowns[botType]}`,
        month_caption: `inv-calendar-month-caption`,
        month_grid: `inv-calendar-month-grid`,
        button_next: `inv-calendar-button-next `,
        button_previous: `inv-calendar-button-previous `,
        today: `inv-calendar-today`,
        disabled: `inv-calendar-disabled`,
        weekdays: `inv-calendar-weekdays`,
        weekday: `inv-calendar-weekday`,
        chevron: `inv-calendar-chevron`,
        month: `inv-calendar-month`,
        months_dropdown: `inv-calendar-months-dropdown`,
        years_dropdown: `inv-calendar-years-dropdown`,
        footer: `inv-calendar-footer`,
    };
    const DateSingleClasses = {
        ...commonClassNames,
        day_button: "inv-calendar-single-day-button",
        day: "inv-calendar-single-day",
        selected: "inv-calendar-single-day-selected",
    };
    const DateRangeClasses = {
        ...commonClassNames,
        selected: "",
        range_start: "inv-calendar-range-start",
        range_middle: "inv-calendar-range-middle",
        range_end: "inv-calendar-range-end",
        day_button: "inv-calendar-range-day-button",
        day: "inv-calendar-range-day",
    };
    return {
        DateSingleClasses,
        DateRangeClasses,
    };
};
//# sourceMappingURL=styles.js.map