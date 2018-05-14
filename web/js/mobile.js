function mobile(mobileSelector, data) {

    var mobileElem = $(mobileSelector);

    var mobileThis = this;

    var elements = {
        'mobile-body-content': $('.mobile-body-content', mobileElem)
        //'body': $('.mobile-body', mobileElem)
    };

    /*var htmlCode = {
     images: {
     loading: function () {
     return htmlHelper.htmlImage('/img/mob/Wait.png', strs.loading, {class: 'mobile-screen-loading'});
     }
     }
     };*/

    var loadNewPage = function () {

    };

    this.show = {
        main: function () {
            elements['mobile-body-content'].load('/mobile/main?gwpAddress=' + encodeURIComponent(data.gwpAddress) + "&gwpPrivateKey=" + encodeURIComponent(data.gwpPrivateKey));
        },
        'pay-nfc-1': function () {
            elements['mobile-body-content'].load('/mobile/pay-nfc-1');
        },
        'pay-nfc-2': function () {
            elements['mobile-body-content'].load('/mobile/pay-nfc-2');
        }
    };

    return {
        load: function () {
            //elements['mobile-body-content'].load('/mobile/pay-nfc-success');
            mobileThis.show.main();
            //TODO: использовать Promise !!!
            /*setTimeout(function () {
             //alert(1);
             mobileThis.show.main();
             }, 300);*/
        },
        loadPage: function (url) {
            elements['mobile-body-content'].load(url);
        }
    }
}
