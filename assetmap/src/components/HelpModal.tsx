import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as ReactModal from 'react-modal';

interface ModalProps {
    modalOpen: boolean,
    openModal: () => Promise<void>,
    closeModal: () => Promise<void>,
}
interface ModalState {
    isDisabled: boolean,
    modalData: any,
}

ReactModal.setAppElement("body");

export default class HelpModal extends React.Component<ModalProps,ModalState> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            isDisabled: false,
            modalData: <> </>,
        }
    }

    customStyles = {
        content: {
            border: "3px solid var(--primary)",
            height: "60vh",
            margin: "auto",
            marginTop: "145px",
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
        const {isDisabled, modalData} = this.state;
        const {modalOpen} = this.props;
        return (
            <>
                {!isDisabled &&
                    <>
                        <ReactModal
                            isOpen={modalOpen}
                            style={this.customStyles}
                            closeTimeoutMS={400}
                            shouldCloseOnOverlayClick={true}
                            shouldCloseOnEsc={true}
                            onRequestClose={this.props.closeModal}
                            >
                            <div id="modalContent"> 
                                {modalData}
                            </div>
                            <button style= {{margin: "auto"}} type="button" className="btn btn-outline-primary font-italic" onClick={this.props.closeModal}>Continue</button>
                        </ReactModal>
                    </>
                }
            </>
        )
    }
}