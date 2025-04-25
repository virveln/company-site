document.addEventListener('DOMContentLoaded', function () {

    // Change label name in information
    document.querySelectorAll('span.clearable-file-input').forEach(input => {
        const inputId = "image-clear_id";
        const label = document.querySelector(`label[for="${inputId}"]`);
        if (label) {
            label.textContent = 'Radera bild';
        }
    });

    // Delete current cells and add delete button
    //const deleteCells = document.querySelectorAll("td.delete, span.clearable-file-input");
    const deleteCells = document.querySelectorAll("td.delete");

    deleteCells.forEach((cell) => {
        const checkbox = cell.querySelector('input[type="checkbox"]');
        if (!checkbox) return;

    if (cell.closest("tbody")) {
        const row = cell.closest("tr");
        const imageIdInput = row.querySelector('input[name$="-id"]');
        const imageId = imageIdInput ? imageIdInput.value : null;
    }

        checkbox.style.display = "none"; // Hide default checkbox

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-image-btn");
        deleteBtn.style.background = "url(/static/admin/img/inline-delete.svg) 0 0 no-repeat";
        deleteBtn.title = "Radera bild";

        deleteBtn.addEventListener("click", function () {
            if (!confirm("Är du säker på att du vill ta bort bilden?")) return;

            // If the image isn't saved yet, just hide the row
            if (!imageId) {
                row.style.display = "none";
                checkbox.checked = checked;
                return;
            }

            // Otherwise, send delete request to backend
            fetch(`/admin/api/apartment/delete-image/${imageId}/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    row.style.display = "none";
                    checkbox.checked = checked;
                } else {
                    alert("Kunde inte ta bort bilden.");
                }
            })
            .catch(err => {
                console.error(err);
                //alert("Något gick fel vid borttagningen.");
            });
        });

        cell.appendChild(deleteBtn);
    });
});

// Utility to get the CSRF token
function getCookie(name) {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='))
        ?.split('=')[1];
    return cookieValue || '';
}
