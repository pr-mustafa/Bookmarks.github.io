var bookmarkNameInput = document.getElementById('bookmarkName');
var siteURLInput = document.getElementById('siteURLin');

var bookmarks = [];
var mainIndex;
var regexSite = /^w{3}\.[a-zA-Z0-9]{1,}\.[a-zA-Z]{2,}$/;
var regexName = /^[a-zA-Z0-9_]{3,}$/;

if (localStorage.getItem("bookmarks") != null) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks();
}

function addBookmark() {
    if (  bookmarkNameInput.classList.contains("is-valid")  && siteURLInput.classList.contains("is-valid"))
    {
        var bookmark = {
            name: bookmarkNameInput.value,
            siteURL: siteURLInput.value,
    
        }
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        displayBookmarks();
        resetFields();
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Site Name or Url is not valid, Please follow the rules below :",
            text: 'Site name must contain at least 3 characters and Site URL must be a valid one',
          });
    }
  
}

function deleteBookmark(index) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success mx-2",
            cancelButton: "btn btn-danger mx-2"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            bookmarks.splice(index, 1);
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            displayBookmarks();
            resetFields();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your bookmark has been deleted.",
                icon: "success"
            });

        } else if (

            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your bookmark is safe :)",
                icon: "error"
            });

        }
    });

}
function visitWebsite(i) {
    window.open(`https://${bookmarks[i].siteURL}`, "_blank");
}

function resetFields() {
    bookmarkNameInput.value = "";
    siteURLInput.value = "";
}

function displayBookmarks() {
    var x = "";
    if (bookmarks.length === 0) {
        document.getElementById("tBody").innerHTML = "<tr><td colspan='4'>No bookmarks available</td></tr>";
    } else {
        for (var i = 0; i < bookmarks.length; i++) {
            x +=
                `
        <tr>
            <td>${i + 1}</td>
            <td>${bookmarks[i].name}</td>
            <td><button class='btn btn-outline-warning' onclick='visitWebsite(${i})'><i class="fa-solid fa-eye me-2"></i>Visit</button></td>
            <td><button class='btn btn-outline-danger' onclick='deleteBookmark(${i})'><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
        </tr>`
            document.getElementById("tBody").innerHTML = x;
        }
    }
}

function validateBookmarkName() {
    var bName = bookmarkNameInput.value;
    if (regexName.test(bName) == true) {
        bookmarkNameInput.classList.add("is-valid");
        bookmarkNameInput.classList.remove("is-invalid");
    }
    else {
        bookmarkNameInput.classList.add("is-invalid");
        bookmarkNameInput.classList.remove("is-valid");
    }
}
function validateBookmarkURL() {
    var bURL = siteURLInput.value;
    if (regexSite.test(bURL) == true) {
        siteURLInput.classList.add("is-valid");
        siteURLInput.classList.remove("is-invalid");
    }
    else {
        siteURLInput.classList.add("is-invalid");
        siteURLInput.classList.remove("is-valid");
    }
}