gitbook.events.bind("page.change", function() {
	let runCodeLinks = $("p:contains('Run the above code example:') a");
	for (let link of runCodeLinks) {
		if (typeof(link.href) == "string" && link.href.startsWith("https://repl.it/")) {
			// A repl.it link is found --> check for code box above it
			let codeBox = $(link).parent().prev();
			if (codeBox.is("pre")) {
				// A code box is found just before the code link --> inject the [Run] button
				let runButton = $("<a href='#' class='run-code-button' style='float:right'>Run</a>");
				let loadingBox = $("<span class='run-code-loading' style='float:right;display:none'>Loading …</span>");
				runButton.click(function() {
					// Replace the code box with the embedded REPL box
					loadingBox.show();
					let replBox = $('<iframe height="500px" width="100%" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>');
					replBox.attr("src", link.href + "?lite=true");
					replBox.on("load", function(event) {
						loadingBox.hide();
					});
					if (codeBox.next().is("iframe")) {
						// We have already the iframe with the Repl.it -> first remove it
						codeBox.next().remove();
					}
					codeBox.after(replBox);
					return false;
				});
				codeBox.prepend(runButton);
				codeBox.prepend(loadingBox);
				
				// Delete the original REPL hyperlink from the DOM
				$(link).parent().remove();
			}
		}
	}
});

// Sample usage: put the below text in your Markdown book source code:
// Run the above code example: [https://repl.it/@nakov/Scrypt](https://repl.it/@nakov/Scrypt).
