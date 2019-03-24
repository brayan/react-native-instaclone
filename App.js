import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import Post from './src/components/Post';

export default class App extends Component {

    constructor() {
        super();
        this.state = { pictures: [] };
    }

    componentWillMount() {
        this.loadPictures();
    }

    loadPictures() {
        fetch("https://instalura-api.herokuapp.com/api/public/fotos/rafael")
            .then(response => response.json())
            .then(pictures => this.setState({ pictures }))
            .catch(e => {
                console.warn('Não foi possível carregar as fotos: ' + e);
                this.setState({ status: 'ERRO' })
            });
    }

    render() {
        return (
            <ScrollView>
                <FlatList
                    style={styles.container}
                    keyExtractor={item => item.id.toString()}
                    data={this.state.pictures}
                    renderItem={({ item }) => <Post postModel={item} />} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
});
