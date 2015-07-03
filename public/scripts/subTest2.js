//lesson learned in subTest.js is that styles should be fed to divs, not react classes.
// define a style within a react class and apply it to divs in class, put other classes in div

//improvements:
  //avoid using Subject for main div, just use overview + list directly
    //note that this will require refactoring Overview so that it doesn't depend on being in Subject
  // I'm using subject index and so is react. in most cases, key=index because I didn't want to 
    // set key in other cases because I don't know what react will do
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
    },
    {
    	name: "Engineering",
    	description: "engineering is about using math and science to design and build things",
    	subjects: [
    		{
    			name: "Design",
    			description: "process of developing products"
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
      width: "100%",
      height: "20%"
    };
    var firstIndex = 0;
    return (
      <div className="subjectTree" style={style}>
        <Subject data={subjectHierarchy} index={firstIndex} name="Subjcet Tree">
          this is root
        </Subject>
      </div>
    );//passing in root object which has a subjects property
  }
});

var Subject = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});// not really ideal to have this here when it is actually being used in the overview
    var index = this.props.index;
    var length = this.props.length;
    var subjectStyle = {
      left: "5%",
      top: (index ? index * 100/length : 0)+"%",
      width: "90%",
      height: (length ? 100/length : 100) +"%"
    };
    return (
      <div className="subject" style={subjectStyle}>
        <Overview rawMarkup={rawMarkup} name={this.props.name}/>
        <SubjectList data={this.props.data.subjects} />
      </div>
    );//pass object of child subjects to subject list
    // goes under overview: <SubjectList data={this.props.data.subjects} />
  }
});


var Overview = React.createClass({

  selectNode: function () {
    console.log(this.props.name);
  },
  

  render: function() {
    var overviewStyle = {
      left: "0%",
      top: "0%",
      width: "30%",
      height: "95%"
    };
        //make overview a button
    return (
      <button className="subjectOverview" onClick={this.selectNode} style={overviewStyle}>
      	{this.props.name}
        <span dangerouslySetInnerHTML={{__html: this.props.rawMarkup}} />
      </button>
        
    );
  }
});

var SubjectList = React.createClass({
  render: function() {
    var subjects = this.props.data;
    if (subjects) {
      var style = {
        left:"35%",
        top:"0%",
        width: "65%", 
        height: "90%"//100/subjects.length+"%"
      };
      var subjectNodes = subjects.map(function(subject, index) {
        //console.log(index);
        return (
          // `key` is a React-specific concept and is not mandatory for the
          // purpose of this tutorial. if you're curious, see more here:
          // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
          <Subject data={subject} name={subject.name} key={index} index={index} length={subjects.length}>
            {subject.description}
          </Subject>
        );//data in subject is the subject object
      });
      return (
        <div className="subjectList" style={style}>
          {subjectNodes}
        </div>
      );
    }else{return (<div className="subjectList">  </div>);}
  }
});


React.render(
  <SubjectTree />,
  document.getElementById('content')
);