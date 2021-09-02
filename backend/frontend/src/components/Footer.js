import React from 'react'
import { Nav } from 'react-bootstrap'

function Footer() {
    return (
        <footer>
                <Nav className="justify-content-center" activeKey="/">
                    <Nav.Item>
                        <Nav.Link href="/">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/">Link</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="https://github.com/InvokerAndrey/offliner">GitHub Repo</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>
                            Disabled
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <p className="text-center mt-4 mb-4">&copy; Phones - чтобы звонить</p>
        </footer>
    )
}

export default Footer
