$(function() {
    country = $.url(location.href).param('country');

    if (country == 'HU') {
        hu_selected = 'selected="selected"';
    } else {
        hu_selected = '';
    }


    selects = $("select[name='country']");
    selects.append('<option value="HU" ' + hu_selected + '>Magyarorsz</option>');

    var change = 0,
        updatePrices = function(item) {
            change = 1;

            $(item.children).each(function() {
                if (this.selected) sel = $(this).val();
            });

            if (typeof sel === 'undefined') {
                sel = 'HU';
            }

            if (sel == 'HU') {
                $('.old_price_val').html('23800');
                $('.old_price_cur').html('ft');
                $('.old_price_sig').html('ft');
                $('.new_price_val').html('11900');
                $('.new_price_cur').html('ft');
                $('.new_price_sig').html('ft');
                $('select').val('HU').trigger('change');
                initializeMask({ mask: "(+36)99999999[9]", removeMaskOnSubmit: false })
            }
            change = 0;
        };
    $("select").change(function() {

        if (change == 0) updatePrices(this);
    }).change();

    function initializeMask(mask) {
        $('[name=phone]').inputmask(mask);
    }
});