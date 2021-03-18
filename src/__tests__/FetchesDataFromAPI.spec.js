import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import LocationList from "../components/LocationList";
import { BrowserRouter as Router } from "react-router-dom";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders blog data", async () => {
    const fakeBlog = [
        {
            id: 1,
            title: "Sean Quotes",
        },
    ];
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeBlog),
        })
    );
    await act(async () => {
        render(
            <Router>
                <LocationList />
            </Router>,
            container
        );
    });

    expect(container.textContent).toContain(fakeBlog[0].title);
    global.fetch.mockRestore();
});