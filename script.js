document.addEventListener('DOMContentLoaded', function() {
    // 尝试从 localStorage 加载餐厅列表
    let restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];

    // 监听输入框的回车事件以添加餐厅
    document.getElementById('restaurantInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addRestaurant();
        }
    });

    // 添加餐厅到列表并更新 localStorage
    window.addRestaurant = function() {
        const input = document.getElementById('restaurantInput');
        const name = input.value.trim();
        if (name && !restaurants.includes(name)) {
            restaurants.push(name);
            // 更新 localStorage
            localStorage.setItem('restaurants', JSON.stringify(restaurants));
            displayRestaurants();
        }
        input.value = ''; // 清空输入框
    };

    // 选择一个餐厅
    window.chooseRestaurant = function() {
        if (restaurants.length > 0) {
            const index = Math.floor(Math.random() * restaurants.length);
            const chosenOne = restaurants[index];
            document.getElementById('chosenRestaurant').textContent = `Final decision: ${chosenOne}`;
        } else {
            alert('Plz enter at least one option！');
        }
    };

    // 显示餐厅列表
    function displayRestaurants() {
        const list = document.getElementById('restaurantList');
        list.innerHTML = '';
        restaurants.forEach((r, index) => {
            const restaurantElement = document.createElement('div');
            restaurantElement.classList.add('restaurant-item');

            const nameElement = document.createElement('span');
            nameElement.classList.add('restaurant-name');
            nameElement.textContent = r;

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '&times;';
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = function() { removeRestaurant(index); };

            restaurantElement.appendChild(nameElement);
            restaurantElement.appendChild(deleteButton);
            list.appendChild(restaurantElement);
        });
    }

    // 删除一个餐厅并更新 localStorage
    function removeRestaurant(index) {
        restaurants.splice(index, 1);
        // 更新 localStorage
        localStorage.setItem('restaurants', JSON.stringify(restaurants));
        displayRestaurants();
    }

    // 初始加载时显示餐厅列表
    displayRestaurants();
});
