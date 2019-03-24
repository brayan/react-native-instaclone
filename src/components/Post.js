import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import LogHelper from '../helper/LogHelper';

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = { post: this.props.postModel, commentValue: '' };
    }

    onLikeSelected() {
        const likers = this.state.post.likers;
        let newList = [];

        if (!this.state.post.likeada) {
            newList = [...likers, { login: 'myUser' }];
        } else {
            newList = likers.filter(liker => liker.login !== 'myUser');
        }

        const pictureUpdated = {
            ...this.state.post,
            likeada: !this.state.post.likeada,
            likers: newList
        }

        this.setState({ post: pictureUpdated, commentValue: '' });
    }

    onSendSelected() {
        if (this.state.commentValue === '') {
            return;
        }
        
        const newList = [...this.state.post.comentarios,
        {
            id: this.state.commentValue,
            login: 'brayan',
            texto: this.state.commentValue
        }];

        const pictureUpdated = {
            ...this.state.post,
            comentarios: newList
        }

        this.setState({ post: pictureUpdated });

        this.inputComment.clear();
    }

    loadIcon(post) {
        return post.likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png');
    }

    showLikers(post) {
        if (post.likers.length > 0) {
            return (<Text style={styles.likes}>{post.likers.length} {post.likers.length > 1 ? "curtidas" : "curtida"}</Text>);
        } else {
            return null;
        }
    }

    showCaptions(post) {
        if (post.comentario === "") {
            return;
        }

        return (
            <View style={styles.commentContainer}>
                <Text style={styles.commentTitle}>{post.loginUsuario}</Text>
                <Text style={styles.commentText}>{post.comentario}</Text>
            </View>
        );
    }

    render() {
        const post = this.state.post;

        return (
            <View>
                <View style={styles.header}>
                    <Image source={{ uri: post.urlPerfil }} style={styles.profilePicture} />
                    <Text style={styles.userName}>{post.loginUsuario}</Text>
                </View>

                <Image source={{ uri: post.urlFoto }} style={styles.picture} />

                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.onLikeSelected.bind(this)}>
                        <Image source={this.loadIcon(post)} style={styles.likeButton} />
                    </TouchableOpacity>
                    {this.showLikers(post)}
                    {this.showCaptions(post)}

                    {post.comentarios.map(comment =>
                        <View style={styles.commentContainer} key={comment.id}>
                            <Text style={styles.commentTitle}>{comment.login}</Text>
                            <Text style={styles.commentText}>{comment.texto}</Text>
                        </View>
                    )}

                    <View style={styles.newCommentContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Adicione um comentário..."
                            ref={input => this.inputComment = input}
                            onChangeText={text => this.setState({ commentValue: text })} />

                        <TouchableOpacity onPress={this.onSendSelected.bind(this)}>
                            <Image style={styles.send} source={require("../../resources/img/send.png")} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}

const screenWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
    header: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    profilePicture: {
        width: 40, height: 40, borderRadius: 20
    },

    picture: {
        width: screenWidth,
        height: screenWidth
    },

    userName: {
        marginLeft: 10
    },

    footer: {
        margin: 10,
    },

    likeButton: {
        width: 40,
        height: 40,
    },

    likes: {
        fontWeight: 'bold',
        marginTop: 10,
    },

    commentContainer: {
        flexDirection: 'row'
    },

    commentTitle: {
        fontWeight: 'bold',
        marginRight: 5
    },

    commentText: {

    },

    input: {
        height: 40,
        flex: 1,
    },

    send: {
        width: 30,
        height: 30,
    },

    newCommentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
});
