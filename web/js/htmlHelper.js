var htmlHelper = {
    //TODO: use json_encode
    htmlImage: function (src, alt, params, width, height) {
        var altString = (alt === undefined) ? '' : alt;
        var html = '<img src="' + src + '" alt="' + altString + '"';
        if (width !== undefined) {
            html += ' width="' + width + '"';
        }
        if (height !== undefined) {
            html += ' height="' + height + '"';
        }
        html += htmlHelper.addTagParams(params) + ' />';
        return html;
    },

    //TODO: use json_encode
    addTagParams: function (params) {
        var html = '';
        if (params !== null && typeof params === 'object') {
            for (var name in params) {
                html += ' ' + name + '="' + params[name] + '" ';
            }
        }
        return html;
    }
};
