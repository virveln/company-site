document.addEventListener('DOMContentLoaded', function () {
    // For Information
    const imageInput = document.querySelector('input[type="file"][name$="image"]');

    if (imageInput) {
        const preview = document.createElement('img');
        preview.style.maxWidth = '200px';
        preview.style.display = 'block';
        preview.style.marginTop = '10px';

        imageInput.parentElement.appendChild(preview);

        imageInput.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                preview.src = '';
            }
        });

        // Show preview if image already exists (edit mode)
        const existingImage = document.querySelector('.file-upload a');
        if (existingImage) {
            preview.src = existingImage.href;
        }
    }

    // For apartment
    /*document.querySelectorAll('input[type="file"]').forEach(input => {
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
