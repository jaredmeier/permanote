import React from 'react';
import { connect } from 'react-redux';
import { updateNotebook } from '../../actions/notebooks/notebook_actions';
import { closeModal } from '../../actions/modal_actions';

class RenameNotebookModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            id: null,
            buttonStatus: "disabled-button"
        }
        this.createNotebook = this.updateNotebook.bind(this);
    }

    componentDidMount() {
        this.setState({
            name: this.props.notebook.name,
            id: this.props.notebook.id,
        })
    }

    updateNotebook(e) {
        e.preventDefault();
        const {name, id} = this.state;
        if (this.state.buttonStatus === "") {
            this.props.updateNotebook({name, id}).then(() => this.props.closeModal());
        }
    }

    updateForm(field) {
        return (e) => {
            this.setState({ [field]: e.target.value }, () => {
                if (this.state.name.length > 0 && this.state.name !== this.props.notebook.name) {
                    this.setState({ buttonStatus: "" })
                } else this.setState({ buttonStatus: "disabled-button" })
            })
        }
    }

    render() {
        const { name } = this.state;
        return (
            <div className="rename-notebook-modal">
                <h3>Rename notebook</h3>
                <button className="close-modal" onClick={this.props.closeModal}>
                    <i className="fas fa-times"></i>
                </button>
                <form id="rename-notebook-form" onSubmit={this.createNotebook}>
                    <label htmlFor="name"><h4>Name</h4>
                        <input name="name" type="text" className="new-notebook-name"
                            onChange={this.updateForm('name')}
                            value={name}
                            placeholder="Notebook name">
                        </input>
                    </label>
                </form>
                <div className="modal-actions">
                    <button onClick={this.props.closeModal}>Cancel</button>
                    <button type="submit" form="rename-notebook-form" id={this.state.buttonStatus}>Continue</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        notebook: state.entities.notebooks[state.ui.modal.actionId]
    }
};

const mapDispatchToProps = dispatch => ({
    updateNotebook: (notebook) => dispatch(updateNotebook(notebook)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(RenameNotebookModal);