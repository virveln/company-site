document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form[id$="_form"]');
    if (!form) {
        return;
    }

    let isDirty = false;

    // Track all editable fields
    const fields = form.querySelectorAll('input, select, textarea');

    fields.forEach(field => {
        field.addEventListener('input', () => {
            isDirty = true;
        });

        field.addEventListener('change', () => {
            isDirty = true;
        });
    });

    // Reset flag on submit
    form.addEventListener('submit', () => {
        isDirty = false;
    });

    // Warn before unload if changes exist
    window.addEventListener('beforeunload', (e) => {
        if (isDirty) {
            e.preventDefault();
            e.returnValue = ''; // Required by Chrome
        }
    });
});
