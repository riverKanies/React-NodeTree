var subjectHierarchy = {
  subjects : [
    {
      name: "Math",
      description: "math is about numbers",
      subjects: [
        {
          name: "Vector",
          description:"vectors have magnitude and direction"
        },
        {
          name: "Line",
          description: "Lines can be defined by two points"
        }
      ]
    },
    {
      name: "Science",
      description: "science is about developing theoretical models through objervation",
      subjects: [
        {
          name: "Chemistry",
          description: "Chemistry is the study of interations on the atomic scale",
        },
        {
          name: "Physics",
          description: "Physics is the study of all forces and motion",

        }
      ]
    }
  ]

};

var SubjectTree = React.createClass({
  render: function() {
    var style = {
      left: "0px",
      top: "0px",
      width: "1000px",
      height: "1000px"
    };
    return (
      <div className="subjectTree">
        <Subject style={style} data={subjectHierarchy} name="Subjcet Tree">
          this is root
        </Subject>
      </div>
    );//passing in root object which has a subjects property
  }
});

var Subject = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    //var subjects= this.props.data.subjects;//check for subjects to decide whether to render list
    var overviewStyle = {
      left: "0%",
      top: "0%",
      width: "100px",
      height: "100px"
    };
    console.log(this.props.style);
    //add to overview:     style={overviewStyle} 
    return (
      <div className="subject">
        <div className="subjectOverview" >
          <h2 className="subjectName">
            {this.props.name}
          </h2>
          <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </div>
        <SubjectList data={this.props.data.subjects} />
      </div>
    );//pass object of child subjects to subject list
  }
});

var SubjectList = React.createClass({
  render: function() {
    var subjects = this.props.data;
    if (subjects) {
      var style = {
        //width: "50%", 
        height: "50px"//100/subjects.length+"%"
      };
      //console.log(style.height);//50% every time... I NEED BOOTSTRAP COLUMNS AND ROWS!
      var subjectNodes = subjects.map(function(subject, index) {
        //console.log(index);
        return (
          // `key` is a React-specific concept and is not mandatory for the
          // purpose of this tutorial. if you're curious, see more here:
          // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
          <Subject style={style} data={subject} name={subject.name} key={index}>
            {subject.description}
          </Subject>
        );//data in subject is the subject object
      });
      return (
        <div className="subjectList">
          {subjectNodes}
        </div>
      );
    }else{return (<div className="subjectList"> No Subjects </div>);}
  }
});

React.render(
  <SubjectTree />,
  document.getElementById('content')
);