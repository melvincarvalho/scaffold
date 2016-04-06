


/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/
var view;
$(function () {


  view = new Vue({
    el: '#app',
    data: {
      app: {
        namebold : 'Solid',
        name : 'Live',
        logo : ''
      },
      leftbar: {
        'dashboard' : true,
        'elements' : false,
        'forms' : false,
        'widgets' : false,
        'layoutoptions' : false,
        'tables' : false,
        'charts' : false,
        'calendar' : true,
        'examples' : false,
        'multilevel' : false,
        'documentation' : true,
        'labels' : false,
        'inbox' : true
      },
      topbar: {
        'tasks' : true,
        'notifications' : true,
        'messages' : true
      },
      user: {
        '@id' : 'https://melvincarvalho.com/#me',
        name: 'Login',
        avatar: "dist/img/avatar3.png",
        role: 'Web Developer',
        since: 'Nov. 2008',
        status: 'Online',
        loggedIn : false
      },
      rightbar: {
        'layout': true,
        'activity': false,
        'settings': false
      },
      widgets: {
        'dashboard': true,
        'summary': true,
        'work': false,
        'chat': false,
        'todo': true,
        'inbox': true,
        'location': false,
        'performance': false,
        'calendar': true
      }
    }
  })

  function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var kb;

  $(function () {

    // $rdf is exported as a global when you load RDFLib, above
    var solid = require('solid')



    $('#login').on('click', function() {
      solid.login().then(function(webid){
        // authentication succeeded; do something with the WebID string
        console.log(webid)
        view.user.loggedIn = true;
        populateUser(webid);
      }).catch(function(err) {
        // authentication failed; display some error message
        console.log(err)
      })

    })



    console.log('solid.js version: ' + solid.meta.version())

    var FOAF  = $rdf.Namespace("http://xmlns.com/foaf/0.1/");

    var userURI = getParameterByName('profile');

    if (!userURI) return;
    populateUser(userURI);


    function populateUser(userURI) {
      solid.identity.getProfile(userURI).then(function (parsedProfile) {
        console.log('getProfile result: %o', parsedProfile)
        kb = parsedProfile.parsedGraph;

        var name = kb.any($rdf.sym(userURI), FOAF('name'));
        var avatar = kb.any($rdf.sym(userURI), FOAF('depiction')) || kb.any($rdf.sym(userURI), FOAF('img'));
        console.log(name);
        console.log(avatar);
        if (name) {
          view.user.name = name.value;
        }
        if (avatar) {
          view.user.avatar = avatar.uri;
        }
        view.user.loggedIn = true;

        $('#logout').on('click', function() {
          console.log('loggin out...');
          view.user.loggedIn = false;
          view.user.avatar = "dist/img/avatar3.png";
          view.user.name = "Login";
        })


      });




    }





  });





});
