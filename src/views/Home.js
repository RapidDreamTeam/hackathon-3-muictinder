import React from 'react';
import {View, Text, Image} from 'react-native'
import Swiper from 'react-native-deck-swiper'
import {StyleSheet} from "react-native";
import PropTypes from "prop-types"
import {withContext} from "../context/withContext";
import { compose } from "recompose";
import {Container} from 'native-base'
import { onSwipedLeft, onSwipedRight, onSwipedTop } from "../api/matcher/SwipeAction";
import {fetchCards} from "../api/matcher/Cards";
import firebase from "react-native-firebase";
import moment from "moment";


const SwiperCards = ({cards, onSwipedLeft, onSwipedRight, onSwipedTop, renderCard, children, onSwipedAllCards, onSwiped, disableTopSwipe, ...rest}) => {
    return (
        <Swiper disableBottomSwipe cards={cards} renderCard={renderCard}
                onSwipedLeft={onSwipedLeft} onSwipedRight={onSwipedRight}
                onSwipedTop={onSwipedTop} stackSize={2}
                onSwiped={onSwiped}
                onSwipedAll={onSwipedAllCards}
                disableTopSwipe={disableTopSwipe} >
            {children}
        </Swiper>
    )
};

SwiperCards.propTypes = {
    cards: PropTypes.shape({
        text: PropTypes.node.isRequired
    }),
    onSwipedLeft: PropTypes.func.isRequired,
    onSwipedRight: PropTypes.func.isRequired,
    onSwipedTop: PropTypes.func.isRequired,
    onSwipedAllCards: PropTypes.func.isRequired

};


const Card = ({name, photo}, idx) => {
    return (<View style={styles.card}>
    <Image
        style={{width: 400, height: 400}}
        source={{uri: photo}} />
    <Text style={styles.text}>{name}</Text>
    </View>);
};

Card.propTypes = {
    text: PropTypes.node.isRequired
};

class Home extends React.Component {

    // static navigationOptions = {
    //     title: 'Minder',
    // };

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Minder",
        };
    };
    componentDidMount() {
        this.resetSwipeUp();
       fetchCards().then((d) => {console.log('done', d); this.setState({cards: d})}).catch(e => console.log(e.msg));
    }

    resetSwipeUp(removeHead) {
      const this_uid = firebase.auth().currentUser.uid;
      if (removeHead) {
        let cards = this.state.cards;
        cards = _.tail(cards);
        firebase.database().ref(`matches/${this_uid}/lastSuper`).once('value').then(e => {
          console.log('last_super', e.val(), cards);
          this.setState({cards: cards, swipeUp: ((e.val() + 86400) < moment().unix())})
        });
      } else {
        firebase.database().ref(`matches/${this_uid}/lastSuper`).once('value').then(e => {
          console.log('last_super', e.val());
          this.setState({swipeUp: ((e.val() + 86400) < moment().unix())})
        });
      }
    }

    // static navigationOptions = {
    //     title: 'Minder',
    //     currentPage: "HOME"
    // };

    state = {
        cards: [],
        swipeUp: true,
        // cards: [
        //     'DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY'
        // ].map(ele => ({ text: ele })) ,
        swipedAllCards: false
    };

    onSwipedAllCards = () => {
        console.log("No more card");
        fetchCards().then((d) => console.log('done', this.setState({cards: d}))).catch(e => console.log(e.msg));
    };

    onCardSwiped = () => {
       console.log('current state',this.state.cards);
       this.resetSwipeUp(true);
    };

    render() {
        const { cards } = this.state;
        console.log("user", this.props.context);
        if  (this.props.context.currentUser === null ){
            return (null)
        }

        return (
            <Container >
                <SwiperCards cards={cards} onSwipedLeft={onSwipedLeft(cards, null)}
                             onSwipedRight={onSwipedRight(cards, null)} onSwipedTop={onSwipedTop(cards, null, this.onCardSwiped)}
                             renderCard={Card} onSwipedAllCards={this.onSwipedAllCards} disableTopSwipe={!this.state.swipeUp}>
                </SwiperCards>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
});


export default compose(withContext)(Home)
