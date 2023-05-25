import { auth, provider, storage } from '../firebase';
import db from '../firebase';
import { generateKey, getCurrentDateTime } from '../utils';
import { SET_USER, SET_CHATLIST, SET_USERS, SET_REQUESTS, SET_NOTIFICATIONS, SET_SELECTED_USER, SET_AADHAR, SET_AUTH_LOADING_STATUS, SET_LOADING_STATUS, GET_ARTICLES, SET_USER_ROLE } from './actionType';

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
})

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
})

export const setAadhar = (status) => ({
    type: SET_AADHAR,
    status: status,
})


export const setUsers = (payload) => ({
    type: SET_USERS,
    data: payload,
})

export const setAuthLoading = (status) => ({
    type: SET_AUTH_LOADING_STATUS,
    status: status,
})

export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload,
})
export const setSelectedUser = (payload) => ({
    type: SET_SELECTED_USER,
    data: payload,
})
export const setNotifications = (payload) => ({
    type: SET_NOTIFICATIONS,
    data: payload,
})

export const setUserRole = (payload) => ({
    type: SET_USER_ROLE,
    role: payload
})
export const setRequests = (payload) => ({
    type: SET_REQUESTS,
    data: payload
})
export const setChatList = (payload) => ({
    type: SET_CHATLIST,
    data: payload
})


export function storeAadhar(payload) {
    return (dispatch) => {
        setAuthLoading(true)
        db.collection("users").doc(payload.email)
            .set(payload).then(storeResult => {
                console.log("aadhar saved successfully")
                dispatch(setAadhar(true))
                dispatch(setAuthLoading(false))
            }).catch(err => {
                console.log(err)
                dispatch(setAuthLoading(false))
            })
    }
}

export function signInAPI() {
    return (dispatch) => {
        dispatch(setAuthLoading(true))
        auth
            .signInWithPopup(provider)
            .then((payload) => {
                const userDocRef = db.collection('users').doc(payload.user.email);
                userDocRef.get().then(doc => {
                    if (doc.exists) {
                        console.log("sucess121")
                        dispatch(setUser(doc.data()));
                        dispatch(setAuthLoading(false))
                    } else {
                        console.log("User Not Exist")
                        const user = auth.currentUser
                        user.delete().then(e => {
                            console.log("User Deleted because data couldn't be saved.")
                            alert("Register First, You're not registered")
                            dispatch(setUser(null))
                            dispatch(setAuthLoading(false))
                        }).catch(err => {
                            alert(err.message)
                            dispatch(setAuthLoading(false))
                        })


                    }
                })
            })
            .catch((error) => {
                dispatch(setAuthLoading(false))
                alert(error.message)
            });
    };
}

export function signUpAPI(passedData) {

    return (dispatch) => {
        const newUserKey = generateKey()
        dispatch(setAuthLoading(true))
        auth.createUserWithEmailAndPassword(passedData.email, passedData.password).then(userObject => {
            console.log("new user generated successfully")
            db.collection("users").doc(passedData.email)
                .set({ ...passedData, connections: [], uid: newUserKey }).then(storeResult => {
                    console.log("new user data saved successfully")
                    dispatch(setUser({ ...passedData, connections: [], uid: newUserKey }))
                    dispatch(setAuthLoading(false))
                }).catch(err => {
                    const user = auth.currentUser()
                    user.delete().then(e => {
                        console.log("User Deleted because data couldn't be saved.")
                        alert("Error Creating a account, try again")
                    }).catch(err => {
                        alert(err.message)
                    })
                    console.log(err)
                    dispatch(setAuthLoading(false))
                })

        }).catch(err => {
            alert(err.message)
            console.log(err)
            dispatch(setAuthLoading(false))
        })
    }
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userDocRef = db.collection('users').doc(user.email);
                userDocRef.get().then(doc => {
                    if (doc.exists) {
                        console.log("sucess121")
                        dispatch(setUser(doc.data()));
                        dispatch(setAuthLoading(false))
                    }
                })
            }
        })
    }
}


export function getAllUsers() {
    return (dispatch) => {
        let payload;

        db.collection('users')
            .orderBy("name")
            .onSnapshot((snapshot) => {
                payload = snapshot.docs.map((doc) => doc.data());
                dispatch(setUsers(payload));
            });
    };
}

export function signOutAPI() {
    return (dispatch) => {
        auth
            .signOut()
            .then(() => {
                console.log('in signoutt API');
                dispatch(setUser(null));
                window.location = "/"
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
}


export function loginUserAPI(passedData) {
    return (dispatch) => {
        dispatch(setAuthLoading(true))
        auth.signInWithEmailAndPassword(passedData.email, passedData.password).then(payload => {
            const userDocRef = db.collection('users').doc(payload.user.email);
            userDocRef.get().then(doc => {
                if (doc.exists) {
                    console.log("sucess121")
                    dispatch(setUser(doc.data()));
                    dispatch(setAuthLoading(false))
                } else {
                    console.log("User Not Exist")
                    const user = auth.currentUser
                    user.delete().then(e => {
                        console.log("User Deleted because data couldn't be saved.")
                        alert("Register First, You're not registered")
                        dispatch(setUser(null))
                        dispatch(setAuthLoading(false))
                    }).catch(err => {
                        alert(err.message)
                        dispatch(setAuthLoading(false))
                    })


                }
            })
        }).catch(err => {
            alert(err.message)
            console.log(err)
            dispatch(setAuthLoading(false))
        })
    }
}

export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));

        if (payload.image !== '') {
            const upload = storage
                .ref(`images/${payload.image.name}`)
                .put(payload.image);
            upload.on('state-changed', (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                console.log(`Progress: ${progress}%`);
                if (snapshot.state === 'RUNNING') {
                    console.log(`Progress: ${progress}%`);
                }
            }, error => console.log(error.code),
                async () => {
                    var postId = "id" + payload.timestamp + Math.random().toString(16).slice(2)
                    const downloadURL = await upload.snapshot.ref.getDownloadURL();
                    db.collection("articles").doc(postId).set({
                        actor: {
                            description: payload.user.email,
                            title: payload.user.name,
                            date: payload.timestamp,
                            image: payload.user.imageUrl || ''
                        },
                        id: postId,
                        video: payload.video,
                        sharedImg: downloadURL,
                        comments: [],
                        likeCount: 0,
                        usersWhoLiked: [],
                        description: payload.description,
                    });
                    dispatch(setLoading(false));
                });
        }
        else if (payload.video) {
            var postId = "id" + payload.timestamp + Math.random().toString(16).slice(2)
            db.collection('articles').doc(postId).set({
                actor: {
                    description: payload.user.email,
                    title: payload.user.name,
                    date: payload.timestamp,
                    image: payload.user.imageUrl || '',
                },
                id: postId,
                video: payload.video,
                sharedImg: '',
                comments: [],
                likeCount: 0,
                description: payload.description,
            });
            dispatch(setLoading(false));
        }
    };
}

export function likePostAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));
        db.collection('articles').doc(payload.article.id).get().then(snapshot => {
            if (snapshot.exists) {
                var newArticle = payload.article
                newArticle.likeCount = payload.count;
                if (!payload.rem) {

                    newArticle.usersWhoLiked = [...newArticle.usersWhoLiked, payload.email]
                } else {
                    var v = newArticle.usersWhoLiked.filter(e => e !== payload.email)
                    newArticle.usersWhoLiked = v
                }
                db.collection('articles').doc(payload.article.id).set(newArticle).then(data => {
                    console.log("Successfully set like count to ", payload.count)
                    dispatch(setLoading(false));
                }).catch(err => {
                    console.log("Some Error occured in setting like count to ", payload.count)
                    dispatch(setLoading(false));

                })
            } else {
                console.log("Not Exists")
                dispatch(setLoading(false));
            }
        })
        dispatch(setLoading(false));

    }
}

export function commentPostAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));
        db.collection('articles').doc(payload.article.id).get().then(snapshot => {
            if (snapshot.exists) {
                var newArticle = payload.article
                newArticle.comments.push(payload.comment)
                console.log(newArticle)
                db.collection('articles').doc(payload.article.id).set(newArticle).then(data => {
                    console.log("Successfully added comment ", payload.comment.message)
                    setLoading(false)
                }).catch(err => {
                    console.log("Some Error occured in adding comment ", payload.comment.message)
                    setLoading(false)
                })
            } else {
                console.log("Not Exists")
                setLoading(false)
            }
        })

        dispatch(setLoading(false));

    }
}

export function getArticlesAPI() {
    return (dispatch) => {
        let payload;

        db.collection('articles')
            .orderBy("actor.date", "desc")
            .onSnapshot((snapshot) => {
                payload = snapshot.docs.map((doc) => doc.data());
                dispatch(getArticles(payload));
            });
    };
}


export function getAllNotifications(user) {
    return (dispatch) => {
        let payload;

        db.collection('notifications')
            .orderBy("time")
            .onSnapshot((snapshot) => {
                payload = snapshot.docs.map((doc) => doc.data());
                var newPayload = payload.filter(e => e.to === user.email)
                dispatch(setNotifications(newPayload))
            });
    };
}

export function setNotificationRead(notificationId) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const docRef = db.collection('notifications').doc(notificationId)

        await docRef.update({
            isNew: false
        })
        dispatch(setLoading(false));

    }
}

export function createNotification(actor, to, type, postId) {
    return (dispatch) => {
        const dateTime = getCurrentDateTime()
        var key = generateKey()
        var newNotification = {
            key: key,
            actor: {
                name: actor.name,
                photoURL: actor.imageUrl || '',
                email: actor.email
            },
            date: dateTime[0],
            time: dateTime[1],
            isNew: true,
            to: to.description,
            postId: postId,
            text: type === 'like' ? `${actor.name} liked your post` : `${actor.name} commented on your post`
        }
        console.log(newNotification)
        db.collection("notifications").doc(key)
            .set(newNotification).then(storeResult => {
                console.log("notification saved successfully")
            }).catch(err => {
                console.log(err)
            })
    }

}


export function sendConnection(actor, to) {
    const dateTime = getCurrentDateTime()
    return (dispatch) => {
        const key = generateKey()
        const message = prompt("Write any message")
        if (!message.length) {
            return
        }
        const request = {
            key: key,
            actor: actor,
            date: dateTime[0],
            time: dateTime[1],
            to: to.email,
            message: message
        }
        db.collection('requests').doc(key).set(request).then(e => {
            alert("Sent Connection Request")
        }).catch(err => {
            alert(err)
        })
    }
}
export function getRequests(user) {
    return (dispatch) => {
        let payload;
        db.collection('requests')
            .orderBy("date")
            .onSnapshot((snapshot) => {
                payload = snapshot.docs.map((doc) => doc.data());
                var newPayload = payload.filter(e => e.to === user.email)
                dispatch(setRequests(newPayload));
            });
    };
}

export function setConnection(user, data) {
    console.log(user.uid, data)
    return (dispatch) => {
        dispatch(setLoading(true));
        db.collection('users').doc(user.email).get().then(snapshot => {
            console.log(snapshot.data())
            if (snapshot.exists) {
                var newUserObj = snapshot.data()
                newUserObj.connections.push(data)
                const docRef = db.collection('requests').doc(data.key)
                docRef.delete().then(e => {
                    db.collection('users').doc(user.email).set(newUserObj).then(result => {
                        setLoading(false)
                    }).catch(err => {
                        console.log(err.message)
                        console.log("Some Error occured in adding connection ", data.actor.name)
                        setLoading(false)
                    })
                })
            } else {
                console.log("Not Exists")
                setLoading(false)
            }
        })
        db.collection('users').doc(data.actor.email).get().then(snapshot => {
            if (snapshot.exists) {
                var newUserObj = snapshot.data()
                newUserObj.connections.push({ ...data, actor: { ...user, connections: null } })
                const docRef = db.collection('requests').doc(data.key)
                docRef.delete().then(e => {
                    db.collection('users').doc(data.actor.email).set(newUserObj).then(result => {
                        setLoading(false)
                    }).catch(err => {
                        console.log(err.message)
                        console.log("Some Error occured in adding connection ", data.actor.name)
                        setLoading(false)
                    })
                })
            } else {
                console.log("Not Exists")
                setLoading(false)
            }
        })

        dispatch(setLoading(false));

    }
}
export function rejectConnection(data) {
    console.log(data)
    return (dispatch) => {
        dispatch(setLoading(true));
        const docRef = db.collection('requests').doc(data.key)
        docRef.delete().then(result => {
            alert("Successfully Rejected")
        })

        dispatch(setLoading(false));
    }
}

export function storeMessage(__newMessage) {
    return (dispatch) => {
        db.collection('messages').add(__newMessage)
    }
}
export function getUserChat() {
    return (dispatch) => {
        db.collection("messages").onSnapshot(querySnapshot => {
            var data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });

            dispatch(setChatList(data))
            console.log(data)
        })

    }
}

