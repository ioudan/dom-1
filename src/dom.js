// 对象风格
// 也叫命名空间风格
// window.dom 是我们提供的全局对象

window.dom = {

    // ↓↓↓ 增 ↓↓↓
    //dom.create(`<div>hi</div>`)用于创建节点
    create(string){
        //template可以容纳任何标签
        const container = document.createElement("template");
        // container.innerHTML = string;
        container.innerHTML = string.trim();
        return container.content.firstChild; 
    },
    //dom.after(node, node2) 用于新增弟弟
    after(node, node2){
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    //dom.before(node, node2) 用于新增哥哥
    before(node, node2){
        node.parentNode.insertBefore(node2, node)
    },
    //dom.append(parent, child) 用于新增儿子
    append(parent, node){
        parent.appendChild(node)
    },
    //dom.wrap(`<div></div>`) 用于新增爸爸
    wrap(node,parent){
        dom.before(node, parent);
        dom.append(parent, node);

    },

    // ↓↓↓ 删 ↓↓↓
    //dom.remove(node) 用于删除节点
    remove(node){
        node.parentNode.removeChild(node);
        return node;
    },
    //dom.empty(parent) 用于删除后代
    empty(node){
        // //方案1
        // node.innerHTML = ''
        
        // // 方案2
        // // const childNodes = node.childNodes;
        // // 新语法
        // const {childNodes} = node;
        // const array = [];
        // for(let i=0;i<childNodes.length;i++){
        //     dom.remove(childNodes[i]);
        //     array.push(childNodes[i]);
        // }
        // return array
        
        const array = [];
        let x = node.firstChild;
        while(x){
            // console.log('-----');
            // console.log(node.firstChild);
            array.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        return array
    },

    // ↓↓↓ 改 ↓↓↓
    //dom.attr(mode, 'title', ?) 用于读写属性
    attr(node, name, value){ //重载
        console.log(arguments.length)
        if(arguments.length === 3){
            node.setAttribute(name, value);
        }else if(arguments.length === 2){
            return node.getAttribute(name);
        }
    },
    //dom.text(node, ?) 用于读写文本内容
    text(node, string){  // 适配  1
        if(arguments.length === 2){
            if('innerText' in node){
                node.innerText  = string // ie
            }else{
                node.textContent  = string // firefox、Chrome
            }
        }else if(arguments.length === 1){
            if('innerText' in node){
                return node.innerText; // ie
            }else{
                return node.textContent; // firefox、Chrome
            }
        }
    },
    //dom.html(node, ?) 用于读写HTML内容
    html(node, html){
        if(arguments.length === 2){
            node.innerHTML = string
        }else if(arguments.length ===1){
            return node.innerHTML
        }
    },
    //dom.style(node, {color:'red'}) 用于修改style
    style(node, name, value){
        if(arguments.length === 3){
            //dom.style(test, 'color', 'red')
            node.style[name] = value
        }else if(arguments.length ===2){
            if(typeof name === 'string'){
                // dom.style(div, ''color)
                return node.style[name]
            }else if(name instanceof Object){
                //dom.style(div, {color:'red'})
                const object = name;
                for(let key in object){
                    //key: border / color
                    // node .style.border = ...
                    // node.style.color = ...
                    node.style[key] = object[key]
                }
            }
        }
    },
    class:{
        //dom.class.add(node, 'blue') 用于添加class
        add(node, className){
            node.classList.add(className)
        },
        //dom.class.remove(node, 'blue') 用于删除class
        remove(node, className){
            node.classList.remove(className)
        },
        //dom.class.has(node, 'blue') 用于判断是否存在class
        has(node, className){
            return node.classList.contains(className)
        }
    },
    //dom.on(node, 'click', fn) 用于添加事件监听
    on(node, eventName, fn){
        node.addEventListener(eventName, fn)
    },
    //dom.off(node, 'click', fn) 用于删除事件监听
    off(node, eventName, fn){
        node.removeEventListener(eventName, fn)
    },

    // ↓↓↓ 查 ↓↓↓

    // 用于获取标签们
    // scope：范围
    find(selector, scope){
        return (scope || document).querySelectorAll(selector)
    },
    // 用于获取父元素
    parent(node){
        return node.parentNode
    },
    // 用于获取子元素
    children(node){
        return node.children
    },
    // 用于获取兄弟姐们元素
    siblings(node){
        //伪数组变成数组之后，进行过滤
        return Array.from(node.parentNode.children).filter(n=>n!==node)
    },
    // 用于获取弟弟，下一个元素
    next(node){
        let x = node.nextSibling
        // nodeType 1节点 3文本
        while(x && x.nodeType === 3){
            x = x.nextSibling;
        }
        return x;
    },
    // 用于获取哥哥，上一个元素
    previous(node){
        let x = node.previousSibling
        // nodeType 1节点 3文本
        while(x && x.nodeType === 3){
            x = x.previousSibling;
        }
        return x;
    },
    // 用于遍历所有节点
    each(nodeList, fn){
        for(let i=0; i<nodeList.length;i++){
            fn.call(null, nodeList[i])
        }
    },
    // 用于获取下标
    index(node){
        const list = dom.children(node.parentNode)
        let i;
        for(i=0;i<list.length;i++){
            if(list[i] === node){
                break
            }
        }
        return i;


    }

}

//可以一次创建多个元素
// window.dom = {
//     create(string){
//         // div 不能容纳td标签
//         const container = document.createElement("div");
//         container.innerHTML = string;
//         return container.children[0];
//     }
// }

//只能一次创建一个
// window.dom = {
//     create(tagName){
//         return document.createElement(tagName);
//     }
// }

//写法2
// window.dom = {
//     create: function() {}
// };

//写法1
// window.dom = {};
// dom.create = function(){};
