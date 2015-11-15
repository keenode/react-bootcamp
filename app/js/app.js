/**
 * app.js
 * Application main script.
*/

/** 4. Checkbox **/
// var Checkbox = React.createClass({
//     getInitialState: function () {
//         return { checked: true };
//     },
//     handleCheck: function () {
//         this.setState({ checked: !this.state.checked });
//     },
//     render: function () {
//         var msg;
//         if(this.state.checked) {
//             msg = 'checked';
//         }
//         else {
//             msg = 'unchecked';
//         }
//         return (
//             <div>
//                 <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked} />
//                 <p>This box is {msg}.</p>
//             </div>
//         );
//     }
// });

// React.render(<Checkbox />,
//     document.getElementById('react-container'));

/** 3. Note App **/
var Note = React.createClass({
    getInitialState: function () {
        return {
            editing: false
        }
    },
    componentWillMount: function () {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
        };
    },
    randomBetween: function (min, max) {
        return (min + Math.ceil(Math.random() * max));
    },
    edit: function () {
        this.setState({ editing: true });
    },
    save: function () {
        this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
        this.setState({ editing: false });
    },
    remove: function () {
        this.props.onRemove(this.props.index);
    },
    renderDisplay: function () {
        return (
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil" />
                    <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash" />
                </span>
            </div>
        );
    },
    renderForm: function () {
        return (
            <div className="note" style={this.style}>
                <textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
                <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
        );
    },
    render: function () {
        if(this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
});

var Board = React.createClass({
    propTypes: {
        count: function (props, propName) {
            if(typeof props[propName] !== 'number') {
                return new Error('The count property must be a number');
            }
            if(props[propName] > 100) {
                return new Error('Creating ' + props[propName] + ' notes if redic');
            }
        }
    },
    getInitialState: function () {
        return {
            notes: []
        };
    },
    nextId: function () {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    add: function (text) {
        var arr = this.state.notes;
        arr.push({
            id: this.nextId(),
            note: text
        });
        this.setState({ notes:arr });
    },
    update: function (newText, i) {
        var arr = this.state.notes;
        arr[i].note = newText;
        this.setState({ notes:arr });
    },
    eachNote: function (note, i) {
        return (
            <Note key={note.id}
                  index={i}
                  onChange={this.update}
                  onRemove={this.remove}>{note.note}</Note>
        );
    },
    remove: function (i) {
        var arr = this.state.notes;
        arr.splice(i, 1);
        this.setState({ notes:arr });
    },
    render: function () {
        return (
            <div className="board">
                {this.state.notes.map(this.eachNote)}
                <button className="btn btn-sm btn-success glyphicon glyphicon-plus" onClick={this.add.bind(null, 'New Note')} />
            </div>
        );
    }
});

React.render(<Board count={10} />,
    document.getElementById('react-container'));

/** 2. React Components **/
// var MyComponent = React.createClass({
//     render: function () {
//         return <div>
//             <h3>{this.props.text}</h3>
//             <p>{this.props.children}</p>
//         </div>;
//     }
// });

// React.render(
//     <div>
//         <MyComponent text="Hello World">
//             This is a hello.
//         </MyComponent>
//         <MyComponent text="How are You?">
//             This is a how are you.
//         </MyComponent>
//         <MyComponent text="Goodbye">
//             This is a goodbye.
//         </MyComponent>
//     </div>
//     , document.getElementById('react-container'));

/** 1. Hello World Example **/
// var HelloWorld = React.createClass({
//     render: function () {
//         return (
//             <div>
//                 <h1>Hello World</h1>
//                 <p>This is some text</p>
//             </div>
//         );
//     }
// });

// React.render(<HelloWorld />, document.body);
