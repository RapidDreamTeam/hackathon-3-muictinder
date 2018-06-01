import React from 'react';
import Swiper from 'react-native-deck-swiper'


const SwiperCards = ({cards, onSwipedLeft, onSwipedRight, onSwipedTop, children, ...rest}) => {
    return (
        <Swiper disableBottomSwipe cards={cards} onSwipedLeft={onSwipedLeft} onSwipedRight={onSwipedRight} onSwipedTop={onSwipedTop} >
            {children}
        </Swiper>
    )
}

class Home extends React.Component {
    state = {
        cards: [],
        swipedAllCards: false
    }

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        })
    }

    onSwipeLeftHandler = () => {

    }


    onSwipeRightHandler = () => {

    }

    onSwipeTopHandler = () => {

    }


    render() {

    }
}


export default Home