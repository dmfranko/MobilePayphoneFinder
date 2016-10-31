/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    MapView,
    Alert,
    TextInput,
    Animated,
    Easing
} from 'react-native';
import {
    Header,
    Title,
    Container,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Button,
    Spinner,
    Footer,
    Icon
} from 'native-base';
import renderIf from './renderif'

class AwesomeNativeBase extends Component {
    toggleView() {
        this.setState({
            showView: !this.state.showView
        })

        this.setState({showError: false})

        setTimeout(() => {
            this.setState({showView: false})
            this.setState({showError: true})
            if (Math.round(Math.random() * 5) == 3)
                this.setState({swat: true});
            }
        , Math.round(Math.random() * 10) * 1000);
    }

    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            spinValue: new Animated.Value(0),
            swat: false
        };
    }

    componentDidMount() {
        this.spin()
    }

    spin() {
        this.state.spinValue.setValue(0);
        Animated.timing(this.state.spinValue, {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear
        }).start(() => this.spin())
    }

    render() {

        const getStartValue = () => '0deg'
        const getEndValue = () => '360deg'

        const spin = this.state.spinValue.interpolate({
            inputRange: [
                0, 1
            ],
            outputRange: [getStartValue(), getEndValue()]
        })

        var view = <View style={{}}>
            <Animated.Image style={{
                width: 100,
                height: 100,
                padding: 20,
                margin: 20,
                borderRadius: 10,
                transform: [
                    {
                        rotate: spin
                    }
                ]
            }} source={require('./img/mattcircle.png')}/>
            <Text style={{
                textAlign: 'center'
            }}>Searching...</Text>
        </View>

        var noview = <View style={{
            margin: 30
        }}>
            <Text>Nothing found</Text>
        </View>

        var swat = <Image style={{
            height: 610
        }} source={require('./img/callingfire.png')}/>

        return (
            <Container>
                {this.state.swat && swat}
                <Header style={{
                    backgroundColor: "#0099CC"
                }}>
                    <Title>Payphone Finder</Title>
                </Header>

                <Content>
                    <Card>
                        <CardItem cardBody>
                            <Text>
                                Let me help you find payphones in the area.
                            </Text>
                            <View style={styles.container}>
                                <Button style={{
                                    backgroundColor: "#66CCFF"
                                }} block onPress={() => this.toggleView()}>
                                    <Text style={{
                                        color: '#FFFFFF'
                                    }}>Find payphones</Text>
                                </Button>

                                {this.state.showView && view}
                                {this.state.showError && noview}
                            </View>
                        </CardItem>
                        <CardItem >
                            <MapView style={{
                                height: 300,
                                margin: 10
                            }} showsUserLocation={true} followUserLocation={true}/>
                        </CardItem>
                    </Card>
                </Content>
                <Footer style={{
                    backgroundColor: "#FFFFFF"
                }}>
                    <Image style={{
                        width: 300,
                        height: 50
                    }} source={require('./img/engage.png')}/>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

AppRegistry.registerComponent('AwesomeNativeBase', () => AwesomeNativeBase);
