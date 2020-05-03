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
            border: "3px solid var(--primary)",
            height: "60vh",
            margin: "auto",
            marginTop: "120px",
            width: "80vw",
        },
        overlay: {
            background: "rgba(0,0,0,0.3)",
            zIndex: 200,
        }
    
    }

    openModal () {
        this.setState({isOpen: true})
    }

    closeModal (): any {
        this.setState({isOpen: false})
    }

    getModalData (): any {
        console.log();
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
                    <p>The Asset Map is a tool to help you see information about climate related initiatives and groups at UBC</p>
                    <ul>
                        <li><b>Groups: </b>It defines any group of people smaller than a ‘Community’ which collectively structured to work towards a certain climate related mission or goal through the coordination of individual projects, events and people.</li>
                        <li><b>Projects: </b>Also difficult to define, this includes specific projects, plans, facilities etc. which contribute to the success of groups in achieving their overall mission. This category is organized with the lowest level of abstraction in mind (excluding individuals). This would also include physical assets.</li>
                        <li><b>Individuals: </b>We are most interested in key contacts, project directors, principal researchers, lead community organizers etc.</li>
                    </ul>
                    <button style= {{margin: "auto"}} type="button" className="btn btn-outline-primary font-italic" onClick={this.closeModal}>Continue</button>
                </ReactModal>
                <button onClick={modalOpen? this.closeModal : this.openModal}className="btn btn-outline-primary action-button">
                    ?
                </button>
            </>
        )
    }
}