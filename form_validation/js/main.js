function LongByteValidate(form, validate, error_calback, success_calback){
    form = $(form).first();
    var error = false;
    $(this).find('.error-box').html('');
    for (selector in validate) {
        $(selector, form).removeClass("error");
        if ($(selector, form).attr("type") == "checkbox") {
            $("label[for="+$(selector, form).attr("id")+"]", form).removeClass("error");
            if ($(selector, form).is(":checked") != validate[selector]) {
                error = true;
                $(selector, form).addClass("error");
                $("label[for="+$(selector, form).attr("id")+"]", form).addClass("error");
            }
        }
        else if (!validate[selector].test($(selector, form).val())) {
            error = true;
            $(selector, form).addClass("error");
        }
    }
    if (error) {
        $(form).find('.error-box').html(errorText.join('<br>'));
        if (typeof(error_calback) == "function")
            error_calback();
        return false;
    } else {
        if (typeof(success_calback) == "function")
            success_calback();
        return true;
    }
}

$(function() {
    //Ajax
    $(".form-callback").submit(function(e) {
        e.preventDefault();
        senderForm = this;
        if (LongByteValidate(this, {
                '[name=name]': /.{2,}/,
                '[name=phone]': /^[\d\-\(\)+\s]{7,}$/,
                '[name=email]': /^.+@.+\..+$/
            })) {

            $.ajax({
                type: "POST",
                url: "/lendiplom.php",
                data: $(senderForm).serializeArray()
            }).done(function() {

                console.log('done');

                $(senderForm).find("input, textarea").val("");

                if ($(senderForm).hasClass('form-callback')) {
                    $(senderForm)
                        .hide()
                        .siblings('.form-complete')
                        .show();
                } else {
                    $(senderForm)
                        .closest('.form-fields')
                        .hide()
                        .siblings('.form-complete')
                        .show();
                }
            });
        }
        return false;
    });

    $('.close').click(function() {

        $('.form-complete').hide();

        $('.form-callback').show();
    });
});


// function reverseString(reversMe){
//     var reverserd = '';
//     for (var i = reversMe.length - 1; i >= 0; i--) {
//         reversMe += [i];
//     }
//     return reverserd;
// }

// console.log(reverseString('Anton'));

