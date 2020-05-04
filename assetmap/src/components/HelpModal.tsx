import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as ReactModal from 'react-modal';


interface ModalState {
    isDisabled: boolean,
    isOpen: boolean,
    modalData: any,
}

ReactModal.setAppElement("body");

export default class HelpModal extends React.Component<{},ModalState> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            isDisabled: false,
            isOpen: true,
            modalData: <> </>,
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

    componentDidMount(): Promise<void> {
        return new Promise((resolve) => {
            this.loadModalData()
            .then(() => resolve())
        })
    }
    openModal () {
        this.setState({isOpen: true})
    }

    closeModal (): any {
        this.setState({isOpen: false})
    }

    loadModalData (): Promise<void> {
        return new Promise((resolve) => {
            const url: string = "http://climatehub.local/wp-json/wp/v2/pages/?slug=asset-map" 
            fetch(url)
            .then((res: any) => {
                res.json()
                .then((data: any) => {
                    let modalData = data[0].content.rendered;
                    if (!modalData || modalData === "") {
                        throw new Error ("No modal data");
                    } else if (modalData) {
                        modalData = <> {ReactHtmlParser(modalData)} </>
                        this.setState({modalData}, () => resolve());
                    }
                }).catch((err: Error) => {
                    this.setState({isDisabled: true}, 
                        () => {
                            console.log(err);
                            resolve();
                        }
                    );
                })
            })
        })
    }
    
    public render() {
        const {isOpen, isDisabled, modalData}= this.state;
        return (
            <>
                {!isDisabled && 
                    <ReactModal
                        isOpen={isOpen}
                        style={this.customStyles}
                        closeTimeoutMS={400}
                        shouldCloseOnOverlayClick={true}
                        shouldCloseOnEsc={true}
                        onRequestClose={this.closeModal}
                        >
                        <div id="modalContent"> 
                            {modalData}
                        </div>
                        <button style= {{margin: "auto"}} type="button" className="btn btn-outline-primary font-italic" onClick={this.closeModal}>Continue</button>
                        <button onClick={isOpen? this.closeModal : this.openModal}className="btn btn-outline-primary action-button">
                                    ?
                        </button>
                    </ReactModal>
                }
            </>
        )
    }
}