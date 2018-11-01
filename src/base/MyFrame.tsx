import * as React from 'react';
import { parseSearch, getChildren } from './helper';

export interface MyFrameProps {
    children?: any;
}

export type FrameStateKeys = 'device' | 'scale' | 'orientation' | 'deviceColor';
export interface MyFrameState {
    phoneSettings: {
        [key: string]: number
    };
    src: string;
}

const buttons: { [s: string]: string[]; } = {
    device: ['iPhone 8'],
    scale: ['25%', '50%', '75%', '100%'],
    orientation: ['portrait', 'landscape'],
    deviceColor: ['black', 'white']
};

const urlify = (str: string): string => (
    (str || '').toLowerCase().replace('%', '').replace(' ', '')
)

const publicKey = 'b4cr3m4kwxxckp0tpqcecqqw4c';
const getSrc = (state: { [key: string]: number }): string => (
    // const { device, scale, orientation, deviceColor } = state;
    // `https://appetize.io/embed/${publicKey}?autoplay=true?device=${urlify(state.device)}&scale=${state.scale}&orientation=${state.orientation}&deviceColor=${state.deviceColor}`
    Object.keys(state).reduce((arr: string[], key) => {
        const val = urlify(buttons[key][state[key]]);
        const str = `${key}=${val}`;
        return [...arr, str];
    }, [`https://appetize.io/embed/${publicKey}?autoplay=true`]).join('&')
)

export class MyFrame extends React.PureComponent<MyFrameProps, MyFrameState> {
    constructor(props: MyFrameProps) {
        super(props);

        this.state = {
            phoneSettings: {
                device: 0,
                scale: 2,
                orientation: 0,
                deviceColor: 0,
            },
            src: '',
        };
    }

    componentDidMount() {
        const obj = parseSearch(window.location.search);
        const html = getChildren(this.props.children, obj);
        console.time('mount');

        // use url to determine src
        // rebundle from src and save to zip
        // make post request to Appetize with zip
        console.log(obj, html);
        const url = 'http://localhost:3000/bundle';
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                ...obj,
                html,
                static: false,
                cache: true,
            })
        })
        .then(res => res.text())
        .then(m => {
            // const iframe = document.getElementById('myFrame');
            // iframe.src = getSrc(this.state);
            // const myFrame: any = document.getElementById('myFrame');
            // this.setState()
            // if (myFrame) {
            //     myFrame.src = getSrc(this.state.phoneSettings);
            // }
            // console.log(m);
            this.setState({ src: getSrc(this.state.phoneSettings) });
            console.timeEnd('mount');
        })
        .catch(err => console.log(err));
    }

    componentDidUpdate() {
        // console.log(window.location.search);
    }

    handleClick = (e: any) => {
        // console.log(e.target);
        const myClass: FrameStateKeys = e.target.className;
        const id = e.target.id.replace(myClass, '');

        console.log(id, myClass);
        // if (myClass === 'device' || myClass === 'orientation') {
        // if(this.state[myClass]) {
        //     this.setState({ [myClass]: Math.floor(parseInt(id, 10)) })
        // }
        
        // }
        // this.setState({ [myClass]: Math.floor(parseInt(id, 10)) })
    }

    render() {
        // const src = getSrc(this.state.phoneSettings);

        // const myButtons = Object.keys(buttons).map((key: string, i: number) => (
        //     <div key={key}>
        //         {buttons[key].map((val: string, j: number) => (
        //             <button className={key} id={`${key}${j}`} key={`${key}${j}`} onClick={this.handleClick} style={{ color: (this.state[key] === j) ? 'purple': 'black' }}>
        //                 {val}
        //             </button>
        //         ))}
        //     </div>
        // ));

        return (
            <div>
                {/* <div>
                    {myButtons}
                </div> */}
                <iframe
                    id="myFrame"
                    src={this.state.src}
                    width='800px'
                    height='800px'
                    frameBorder='0'
                    scrolling='no'>
                </iframe>
            </div>
        );
    }
}