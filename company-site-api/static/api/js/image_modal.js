document.addEventListener('DOMContentLoaded', () => {
    // Create modal for enlarged image
    const modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = 1000;

    const img = document.createElement('img');
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    modal.appendChild(img);

    modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.body.appendChild(modal);

    // Global function to open the modal (called from image onclick)
    window.openImageModal = function (src) {
        img.src = src;
        modal.style.display = 'flex';
    };

    // Live preview of image uploads
   /* document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const previewField = e.target
                        .closest('.inline-related')
                        .querySelector('[data-image-preview]');

                    if (previewField) {
                        previewField.innerHTML = `
                            <img src="${event.target.result}" height="100" style="object-fit:contain; cursor:pointer;" onclick="openImageModal('${event.target.result}')" />
                        `;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    });*/
});

function bindImagePreviewEvents(context = document) {
    context.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    // 🔧 Find the closest row to the input
                    const row = e.target.closest('.form-row, .inline-related');
                    const previewField = row?.querySelector('[data-image-preview]');

                    if (previewField) {
                        previewField.innerHTML = `
                            <img src="${event.target.result}" height="100" style="object-fit:contain; cursor:pointer;" onclick="openImageModal('${event.target.result}')" />
                        `;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Bind to existing inputs
    bindImagePreviewEvents();

    // Re-bind when Django adds a new inline form
    document.body.addEventListener('formset:added', function (event) {
        bindImagePreviewEvents(event.target);
    });
});

