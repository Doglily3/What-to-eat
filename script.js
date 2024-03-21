document.addEventListener('DOMContentLoaded', function() {
    let restaurants = [];

    document.getElementById('restaurantInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addRestaurant();
        }
    });

    window.addRestaurant = function() {
        const input = document.getElementById('restaurantInput');
        const name = input.value.trim();
        if (name && !restaurants.includes(name)) {
            restaurants.push(name);
            displayRestaurants();
        }
        input.value = ''; // 清空输入框
    };

    window.chooseRestaurant = function() {
        if (restaurants.length > 0) {
            const index = Math.floor(Math.random() * restaurants.length);
            const chosenOne = restaurants[index];
            document.getElementById('chosenRestaurant').textContent = `今晚就吃：${chosenOne}`;
        } else {
            alert('请先添加至少一个餐厅！');
        }
    };

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

    function removeRestaurant(index) {
        restaurants.splice(index, 1);
        displayRestaurants();
    }
});
