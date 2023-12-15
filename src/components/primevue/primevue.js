import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';

export function registerPrimeVueComponents(app) {
    app.component('PrimeButton', Button);
    app.component('PrimeCheckbox', Checkbox);
    app.component('PrimeDropdown', Dropdown);
    app.component('PrimeRadioButton', RadioButton)
}