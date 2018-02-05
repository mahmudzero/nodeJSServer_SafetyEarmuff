$(function() {
    $('.send-emails-button').on('click', sendEmails);
});

function sendEmails() {
    $.ajax({
        type: "POST",
        url: "send-mail",
        data: undefined,
        dataType: 'json',
        success: function() { console.log('success'); },
        error: function() { console.log('fail'); },
    });
}