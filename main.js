let data = [];

const add = document.querySelector('.btn_add');
const list = document.querySelector('.list');
const content = document.querySelector('.content');
let toggleStaus = 'all';

//新增
add.addEventListener('click', function(e) {
  if (content.value == '') {
    alert('請輸入內容');
    return;
  }
  let obj = {
    content: content.value,
    id: new Date().getTime(),
    isChecked: false,
  };
  data.push(obj);
  const elems = document.querySelector('.active');
  const all = document.querySelector('.all');
  if (elems !== null) {
    elems.classList.remove('active');
  }
  all.classList.add('active');
  Update();
});

//畫面更新
function render(arr) {
  let str = '';
  arr.forEach(i => {
    str += `<li data-id="${i.id}">
            <label class="checkbox" >
                <input type="checkbox" ${i.checked}/>
                <span>${i.content}</span>
              </label>
              <a href="#" class="delete" >X</a>
            </li>`;
  });
  list.innerHTML = str;
}

//tab 切換
const tab = document.querySelector('.tab');
tab.addEventListener('click', function(e) {
  toggleStaus = e.target.dataset.tab;
  console.log(toggleStaus);

  //移除所有class
  let tabs = document.querySelectorAll('.tab li');
  tabs.forEach(i => {
    i.classList.remove('active');
  });
  //點選時加上class
  e.target.classList.add('active');
  Update();
});

//刪除 & 切換checked 狀態
list.addEventListener('click', deleteChecked);

function deleteChecked(e) {
  let id = e.target.closest('li').dataset.id;
  if (e.target.classList.value == 'delete') {
    e.preventDefault();
    //刪除動作
    data = data.filter(i => i.id != id);
  } else {
    //切換check
    data.forEach((i, index) => {
      if (i.id == id) {
        if (data[index].checked == 'checked') {
          data[index].checked = null;
        } else {
          data[index].checked = 'checked';
        }
      }
    });
  }
  Update();
}

//刪除全部
const delete_all = document.querySelector('.delete_all');
delete_all.addEventListener('click', function() {
  //   alert('dsccd');
  data = [];
  list.innerHTML = '';
  Update();
});

//更新待辦清單
function Update() {
  let showData = [];
  if (toggleStaus == 'all') {
    showData = data;
  } else if (toggleStaus == 'todo') {
    showData = data.filter(i => i.checked == null);
    console.log(showData);
  } else {
    showData = data.filter(i => i.checked == 'checked');
    console.log(showData);
  }
  const Num = document.querySelector('.total');
  let todolength = data.filter(i => i.checked == null);
  Num.textContent = todolength.length;

  render(showData);
}

//初始化
Update();
