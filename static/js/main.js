document.addEventListener('DOMContentLoaded', function() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.select-row');

    selectAllCheckbox.addEventListener('change', function() {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });

    // Additional JavaScript can be added here for delete, filter, and export functionalities
});


document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("addRoomModal");
    var btn = document.getElementById("addBtn");
    var span = document.getElementsByClassName("close")[0];
    var form = document.getElementById("addRoomForm");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    form.onsubmit = function(event) {
        event.preventDefault();
        var formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            headers: {
                "X-CSRFToken": formData.get("csrfmiddlewaretoken"),
                "X-Requested-With": "XMLHttpRequest",
            },
            body: formData,
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(data => {
                    throw new Error(data.errors);
                });
            }
        }).then(data => {
            alert(data.message);
            modal.style.display = "none";
            window.location.reload();
        }).catch(error => {
            console.error("Erro:", error);
            alert("Erro ao adicionar a sala: " + error.message);
        });
    }
});
