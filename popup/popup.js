$(document).ready(function () {
    $('#save').click(function () {
        let prefill = { name: '', message: '' };
        prefill.name = $('#name').val();
        prefill.message = $('#message').val();
        if (prefill.name === '') {
            alert('Empty Title. Please put Title.');
            return;
        }
        chrome.storage.local.get('pre_fills', function (item) {
            let pre_fills = item.pre_fills;
            if (pre_fills === undefined) {
                pre_fills = [];
            }
            let temp_profill = pre_fills.filter(function (obj) {
                return obj.name === prefill.name;
            });
            if (temp_profill.length > 0) {
                alert('Duplicated Title. Please change Title to another one.');
                return;
            }
            pre_fills.push(prefill);
            pre_fills.sort(pre_sort);
            createMenus(pre_fills);
            chrome.storage.local.set({ 'pre_fills': pre_fills }, function () {
                console.log('Success to store');
                alert('Success to create new Title');
            });
        });
    });

    $('#create').click(function () {
        $('#create_profile').css('display', 'block');
        $('#list_profile').css('display', 'none');
    });

    $('#list').click(function () {
        $('#list_profile').css('display', 'block');
        $('#create_profile').css('display', 'none');
        $('#list_profile').empty();
        chrome.storage.local.get('pre_fills', function (item) {
            let pre_fills = item.pre_fills;
            if (pre_fills !== undefined) {
                pre_fills.sort(pre_sort);
                for (let i = 0; i < pre_fills.length; i++) {
                    let prefill = pre_fills[i];
                    let div = '<div class="row">' +
                        '<div class="col-sm-10 profile-name">' +
                        '<input type="button" class="form-control btn btn-success profile-data" value="' + prefill.name + '"/>' +
                        '</div>' +
                        '<div class="col-sm-2 delete-btn">' +
                        '<input type="button" class="form-control btn btn-warning delete" value="Delete"/>' +
                        '</div>' +
                        '</div>';
                    $('#list_profile').append(div);
                }
                console.log('Success to list');
            }
        });
    });
    $(document).on("click", "input.profile-data", function () {
        let name = $(this).val();
        chrome.storage.local.get('pre_fills', function (item) {
            let pre_fills = item.pre_fills;
            if (pre_fills !== undefined) {
                let prefill = pre_fills.find(function (obj) {
                    return obj.name === name;
                });
                $('#name').val(prefill.name);
                $('#message').val(prefill.message);

                $('#create_profile').css('display', 'block');
                $('#list_profile').css('display', 'none');
            }
        });
    });
    $(document).on("click", "input.delete", function () {
        let name = $(this).closest('div.row').find('input.profile-data').val();
        $(this).closest('div.row').remove();
        chrome.storage.local.get('pre_fills', function (item) {
            let pre_fills = item.pre_fills;
            if (pre_fills !== undefined) {
                pre_fills = pre_fills.filter(function (obj) {
                    return obj.name !== name;
                });
                pre_fills.sort(pre_sort);
                createMenus(pre_fills);
                chrome.storage.local.set({ 'pre_fills': pre_fills }, function () {
                    console.log('Success to store');
                });
            }
        });
    });
});

function createMenus(pre_fills) {
    chrome.contextMenus.removeAll();
    if (pre_fills !== undefined) {
        for (let i = 0; i < pre_fills.length; i++) {
            let prefill = pre_fills[i];
            pre_fills.sort(pre_sort);
            chrome.contextMenus.create({
                title: prefill.name,
                contexts: ["editable"],
                id: prefill.name,
            });
        }
    }
}
function pre_sort(a, b) {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1; }
    return 0;
}

