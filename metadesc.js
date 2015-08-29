(function() {
    "use strict";

    var Description = function(targetElm,caller){
        this.targetElm = targetElm;
        this.caller= caller;
    };
    Description.prototype={
        setTitle:function(url){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.addEventListener('readystatechange',this,false);
            xhr.send();
        },
        handleEvent:function(evt){
            if(evt.target.readyState===4&&evt.target.status===200){
                var dom = this.caller.parseDom(evt.target.responseText);

                var metas= dom.getElementsByTagName('meta');
                for(var i=0;i<metas.length;i++){
                    if(metas[i].name==="description"){
                        this.targetElm.title = metas[i].content;
                    }
                }
            }
        }
    };
    var Main = function() {

    };
    Main.prototype = {
        startup: function() {
            var p = document.createElement('p');
            p.addEventListener('click', this, false);
            p.textContent = "hoge";
            document.body.appendChild(p);

            var list = document.getElementsByTagName('a');
            for (var i = 0; i < list.length; i++) {

                var desc = new Description(list[i],this);
                desc.setTitle(list[i].href);
            }
        },
        parseDom: function(text) {
            var dom = document.createElement('dom');
            dom.innerHTML = text;
            return dom;
        }
    };

    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
            new Main().startup();
        }, false);
    }
}());
