class Card {
    container;
    categoryId; 
    id;
    views;
    review;
    img;
    cardTitle;
    cardCategory;
    imgEye;
    counter;
    coloredStars;
    onX;

    constructor(title, category, image, id, views, showDelete = false) {
        this.views = views;
        this.id = id;
        this.container = document.createElement('div');
        this.container.className = 'card';
        this.img = document.createElement('img');
        this.img.src = image;
        this.img.className = 'img';
        this.container.append(this.img);
        this.cardTitle = document.createElement('div');
        this.cardTitle.innerHTML = title;
        this.cardTitle.className = 'title';
        this.container.append(this.cardTitle);
        let containerCardCategory = document.createElement('div'); 
        containerCardCategory.className = 'container-category';
        this.cardCategory = document.createElement('img');
        this.cardCategory.width = 20;
        this.cardCategory.height = 20;
        this.cardCategory.src = '../img/categories/' + category + '.png';
        this.categoryId = category;
        this.container.append(containerCardCategory);
        containerCardCategory.append(this.cardCategory);
        this.onX = false;
        if (showDelete) {
            this.deleteGame();
        }
        this.container.addEventListener('click', () => {    
            if (this.onX == false) {
                window.location.href = '/game/' + this.id;
            }
        })
        let wrapper = document.createElement('div');
        this.imgEye = document.createElement('img');
        this.counter = document.createElement('span');
        this.imgEye.src = '../img/eye.png';
        this.imgEye.width = 20;
        this.imgEye.height = 20;
        this.imgEye.style.marginRight = 2;
        this.imgEye.style.marginBottom = -5;
        wrapper.className = 'eye';
        wrapper.appendChild(this.imgEye);
        if (views > 999) {
            if (views > 999999) {
                views /= 1000000;
                views = views.toFixed(1);
                views += 'M';
            } else {
                views /= 1000;
                views = views.toFixed(1);
                views += 'k';
            }
        }
        this.counter.innerHTML = views;
        this.counter.className = 'counter';
        wrapper.appendChild(this.counter);
        this.container.appendChild(wrapper);
    }

    appendTo(element) {
        element.append(this.container);
    }

    removeFrom(element) {
        if (element.contains(this.container)) {
            element.removeChild(this.container);
        }
    }

    setAvgReviews(avg) {
        this.review = document.createElement('div');
        this.review.className = 'reviewsStar';
        this.review.innerHTML = '★★★★★';
        this.coloredStars = document.createElement('div');
        this.coloredStars.className = 'reviewsColoredStars';
        this.coloredStars.innerHTML = '★★★★★';
        this.coloredStars.style.width = avg * 15;
        this.review.appendChild(this.coloredStars);
        this.container.append(this.review);
    }

    biggerCard(description) {
        this.container.className = 'biggerCard';
        this.img.width = 317;
        this.img.height = 237.75;
        this.cardTitle.className = 'biggerTitle';
        let cardDescription = document.createElement('div');
        cardDescription.innerHTML = description;
        cardDescription.className = 'biggerDescription';
        this.container.append(cardDescription);
        this.cardCategory.width = 30;
        this.cardCategory.height = 30;
        this.imgEye.width = 18;
        this.imgEye.height = 18;
        this.counter.className = 'littleCounter';
    }

    deleteGame() {
        let x = document.createElement('div');
        x.innerHTML = 'X';
        x.className = 'delete';
        this.container.appendChild(x);
        x.addEventListener('mouseenter', () => {
            this.onX = true;
        })
        x.addEventListener('mouseleave', () => {
            this.onX = false;
        })
        x.addEventListener('click', () => {
            let fbody = document.getElementById('fbody');
            let confirmDelete = document.createElement('div');
            confirmDelete.className = 'confirm-delete';
            fbody.appendChild(confirmDelete);
            let deleteWrite = document.createElement('div');
            deleteWrite.innerHTML = 'Are you sure you want to delete this game?';
            deleteWrite.className = 'delete-write';
            confirmDelete.appendChild(deleteWrite);
            let deleteButtons = document.createElement('div');
            deleteButtons.className = 'delete-buttons';
            confirmDelete.appendChild(deleteButtons);
            let yes = document.createElement('button');
            yes.innerHTML = 'Yes';
            yes.className = 'button1';
            deleteButtons.appendChild(yes);
            let no = document.createElement('button');
            no.innerHTML = 'No';
            no.className = 'button1';
            deleteButtons.appendChild(no);
            no.addEventListener('click', () => {
                fbody.removeChild(confirmDelete);
            })
            yes.addEventListener('click', () => {
                this.container.remove();
                fbody.removeChild(confirmDelete);
                $.ajax({
                    type: 'POST',
                    url: '/delete/' + this.id,
                    success: function(response) {
                        alert("Game deleted successfully");
                    }
                })
            })
        })
    }
}