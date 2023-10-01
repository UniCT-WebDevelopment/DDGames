class cardReview {
    
    cardContainer;
    from;
    numberOfStars;

    constructor(text, star, user) {
        this.cardContainer = document.createElement('div');
        this.cardContainer.className = 'cardReview';
        var stars = document.createElement('div');
        stars.className = 'stars';
        stars.innerHTML = '★★★★★';
        this.cardContainer.appendChild(stars);
        var coloredstars = document.createElement('div');
        coloredstars.className = 'coloredstars';
        coloredstars.innerHTML = '★★★★★';
        coloredstars.style.width = 15 * star;
        stars.appendChild(coloredstars);
        this.from = document.createElement('div');
        this.from.innerHTML = 'From ' + user + ':';
        this.from.className = 'from';
        this.cardContainer.appendChild(this.from);
        var userReview = document.createElement('div');
        userReview.className = 'userReview';
        userReview.innerHTML = text;
        this.cardContainer.appendChild(userReview);
        this.numberOfStars = star; 
    }

    appendTo(element) {
        element.append(this.cardContainer);
    }

    changeFrom(element) {
        this.from.innerHTML = element;
    }

    removeFromFather() {
        this.cardContainer.remove();
    }
}