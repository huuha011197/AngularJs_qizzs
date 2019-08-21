'use strict';
angular.module('myApp')
    .factory('studentFactory', ['$http', function ($http) {
        var studentFactory = {};
        var list = [];
        var isLogin = false;
        var self = this;

        studentFactory.getIsLogin = () => {
            return isLogin;
        };
        studentFactory.setIsLogin = (value) => {
            isLogin = value;
        }

        studentFactory.checkLogin = (username, password) => {
            var promise = studentFactory.getStudents().then((data) => {
                var students = data.filter(item => {
                    return item.username === username && item.password === password;
                });
                return students;
            });

            return promise;
        }
        studentFactory.checkLogin2 = (username, password) => {
            var promise = studentFactory.getSession() ;
                var students = promise.filter(item => {
                    return item.username === username && item.password === password;
                });
                sessionStorage.setItem('user', JSON.stringify(username));
                return students;
        }
        studentFactory.repassword = (password,newp) => {
            var promise = studentFactory.getSession2() ;
            console.log(promise);
                var students = promise.filter(item => {
                    return item.password === password;
                });


                var data={
                    'username': students[0].username,
                    'password': newp,
                    "fullname": students[0].fullname,
                    "email": students[0].email,
                    "gender": students[0].gender,
                    "birthday": students[0].birthday,
                    "schoolfee":students[0].schoolfee ,
                    "marks": "0"
                }
                // console.log('student', students); 
                // console.log(data);
                var student2 =studentFactory.getSession();
                student2.push(data);
                console.log(student2);
                sessionStorage.removeItem('name');
                sessionStorage.setItem('name', JSON.stringify(student2));
                return students;
        }
        studentFactory.Register =(username) => {
            var promise = studentFactory.getStudents().then((data) => {
                var students = data.filter(item => {
                    return item.username === username;
                });
                return students;
            });
            return promise;
        }
        studentFactory.checkemail =(email ) => {
            var promise = studentFactory.getSession() ;
            var students = promise.filter(item => {
                return item.email === email ;
            });
            var students2 = promise.filter(item => {
                return item.email !== email ;
            });
            console.log(students2);
            sessionStorage.setItem('sua', JSON.stringify(students));
            sessionStorage.removeItem('name');
            sessionStorage.setItem('name', JSON.stringify(students2));
            return students;
        }
        studentFactory.getStudents = function () {
            console.log("Test ");
            var promise = $http.get('db/Students.json').then(response => {
                list = list = response.data;
                //console.log(response.data);
                return list;
            }).catch(reason => alert(reason));

            return promise;
        };
        
        studentFactory.getSession= function(){
            console.log("ok ");
            var retrievedData = sessionStorage.getItem("name");
            var movies2 = JSON.parse(retrievedData);
            return movies2;
        }
        studentFactory.getSession2= function(){
            console.log("ok ");
            var retrievedData = sessionStorage.getItem("sua");
            var movies2 = JSON.parse(retrievedData);
            return movies2;
        }
        studentFactory.getUser= function(){
            console.log("ok ");
            var retrievedData = sessionStorage.getItem("user");
            var movies2 = JSON.parse(retrievedData);
            var promise = studentFactory.getSession() ;
            var students = promise.filter(item => {
                return item.username === movies2;
            });
            return students;
        }
        studentFactory.getList = function () {
            console.log('Get List Function');
            console.log(list);
            return list;
        };
        return studentFactory;
    }]);