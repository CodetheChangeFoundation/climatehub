import * as React from 'react';
import * as ReactModal from 'react-modal';

interface ModalState {
    isOpen: boolean
}

ReactModal.setAppElement("body");

export default class HelpModal extends React.Component<{},ModalState> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            isOpen: true,
        }

        this.closeModal = this.closeModal.bind(this)
        this.openModal = this.openModal.bind(this)
    }

    customStyles = {
        content: {
            height: "50vh",
            margin: "auto",
            marginTop: "200px",
            width: "80vw",
        },
        overlay: {
            zIndex: 1000,
        }
    
    }

    openModal () {
        this.setState({isOpen: true})
    }

    closeModal (): any {
        this.setState({isOpen: false})
    }
    
    public render() {
        const modalOpen= this.state.isOpen
        return (<>
                <ReactModal 
                    isOpen={modalOpen}
                    style={this.customStyles}
                    closeTimeoutMS={400}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={this.closeModal}
                >
                    <h1>Welcome to the ClimateHub Asset Map!</h1> 
                    <p>Testing this modal</p>
                    <button style= {{margin: "auto"}} type="button" className="btn btn-outline-primary font-italic" onClick={this.closeModal}>Continue</button>

                </ReactModal>
                <button onClick={modalOpen? this.closeModal : this.openModal}className="btn btn-outline-primary action-button">
                    ?
                </button>
            </>
        )
    }
}