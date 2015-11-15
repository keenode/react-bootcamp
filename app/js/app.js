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
    edit: function () {
        this.setState({ editing: true });
    },
    save: function () {
        this.setState({ editing: false });
    },
    remove: function () {
        alert('removing note');
    },
    renderDisplay: function () {
        return (
            <div className="note">
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
            <div className="note">
                <textarea defaultValue={this.props.children} className="form-control"></textarea>
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

React.render(<Note>Hello World</Note>,
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
