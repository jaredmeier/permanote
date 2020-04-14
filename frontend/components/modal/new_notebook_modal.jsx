import React from 'react';
import { connect } from 'react-redux';
import { createNotebook } from '../../actions/notebooks/notebook_actions';
import { closeModal } from '../../actions/modal_actions';

class NewNotebookModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            author_id: this.props.currentUser,
            buttonStatus: "disabled-button"
        }
        this.createNotebook = this.createNotebook.bind(this);
    }

    createNotebook(e) {
        e.preventDefault();
        if (this.state.buttonStatus === "") {
            this.props.createNotebook(this.state).then(() => this.props.closeModal());
        }
    }

    updateForm(field) {
        return (e) => {
            this.setState({ [field]: e.target.value }, () => {
                if (this.state.name.length > 0) {
                    this.setState({ buttonStatus: "" })
                } else this.setState({ buttonStatus: "disabled-button" })
            })
        }
    }

    render() {
        const { name } = this.state;
        return (
            <div className="new-notebook-modal">
                <h3>Create new notebook</h3>
                <button className="close-modal" onClick={this.props.closeModal}>
                    <i className="fas fa-times"></i>
                </button>
                <p>Notebooks are useful for grouping notes around a common topic.</p>
                <form id="new-notebook-form" onSubmit={this.createNotebook}>
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
                    <button type="submit" form="new-notebook-form" id={this.state.buttonStatus}>Continue</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.session.id
    }
};

const mapDispatchToProps = dispatch => ({
    createNotebook: (notebook) => dispatch(createNotebook(notebook)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewNotebookModal);