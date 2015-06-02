var itemContent = [
    '<h2 class="item-main-title">@{type}  @{title}</h2>',
    '<h3 class="item-title">概述</h3>',
    '<div class="item-des">',
    '<p>@{summary}</p>',
    '</div>',
    '<h3 class="item-title">参数</h3>',
    '<div>',
    '<p>@{param.title}</p>',
    '<p>@{param.summary}</p>',
    '</div>',
    '<h3 class="item-title">示例</h3>',
    '<div>',
    '<p>@{example}</p>',
    '</div>'
].join('');
var render = function(obj, tpl) {
    var temHtml = itemContent;
    temHtml = temHtml.replace(/@\{.+?\}/g, function(match, index, str) {
        var attr = match.replace(/(@\{|\})/g, '').split('.');
        var temObj = {};
        for (var j = 0; j < attr.length; j++) {
            temObj = obj[attr[j]];
        }
        return temObj;
    });

    return temHtml;
};

function showApiItem(name) {
    var temData = {};
    var containEle = document.getElementById('item_content');
    var i = data.length - 1;
    if (i > -1) {
        do {
            if (data[i].name === name) {
                temData = data[i];
            }
        } while (--i > -1);
    }
    var html = render(temData, itemContent);
    containEle.innerHTML = html;
}

function initEvent() {
    var parentNode = document.getElementById('items');
    parentNode.addEventListener('click', function (ev){
        var target = ev.target;
        var selectItem = target.dataset && target.dataset.item;
        if (selectItem) {
            showApiItem(selectItem);
        }
    }, false);

    var btnSearch = document.getElementById('search_btn');
    btnSearch.addEventListener('click', function (ev) {
        var valSearch = document.getElementById('search_val').value;
        var findItems = parentNode.getElementsByTagName('li');
        var j = findItems.length - 1;
        if (j > -1) {
            do {
                if (findItems[j].dataset.item
                    && findItems[j].dataset.item.toLowerCase() === valSearch.toLowerCase()) {
                    findItems[j].click();
                }
            } while (--j > -1);
        }
    }, false);
}

function init() {
    showApiItem('jsonp');
    initEvent();
}

init();