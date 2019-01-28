var preview = new Reef("#preview", {
	data: {
		embed: {
			username: "Webhooker",
			avatar_url: "",
			content: "",
			file: "content",
			embeds: [{
				color: 2067276,
				author: {"name": "addy-fe", "icon_url": "https://avatars3.githubusercontent.com/u/7688126", "url": "https://github.com/addy-dclxvi/"},
				title: "almighty-dotfiles",
				description: "WM: Openbox\nBar: tint2",
				url: "https://github.com/addy-dclxvi/almighty-dotfiles",
				type: "content",
				image: {"url": "https://raw.githubusercontent.com/addy-dclxvi/almighty-dotfiles/master/preview-openbox.jpg"},
				thumbnail: {"url": "https://raw.githubusercontent.com/addy-dclxvi/almighty-dotfiles/master/preview-startpage.jpg"},
				footer: {"text": "BTW I use Gentoo", "icon_url": "https://www.gentoo.org/assets/img/logo/gentoo-g.png"},
				fields: [
					{
						"name": "Openbox Theme",
						"value": "Arroundie",
						"inline": false
					},
					{
						"name": "GTK Theme",
						"value": "Lumiere",
						"inline": false
					},
					{
						"name": "Panel",
						"value": "tint2",
						"inline": false
					},
					{
						"name": "Running Apps",
						"value": "Feh, Thunar, & vim inside termite",
						"inline": false
					}
				]
			}]
		}
	},
	template: function (props) {
		let embed = props.embed.embeds[0],
			avatarImg = "",
			thumbImg = "",
			imageImg = "",
			authorURL = "",
			titleURL = "",
			authorImg = "",
			footerImg = "",
			fieldsHTML = ""

		console.log(`${props.embed.avatar_url}`)

		if (props.embed.avatar_url) {
			avatarImg = `src="${props.embed.avatar_url}"`
		}

		if (embed.url) {
			titleURL = `href="${embed.url}"`
		}

		if (embed.thumbnail.url) {
			thumbImg = `src="${embed.thumbnail.url}"`
		}

		if (embed.image.url) {
			imageImg = `src="${embed.image.url}"`
		}

		if (embed.author.url) {
			authorURL = `href="${embed.author.url}"`
		}

		if (embed.author.icon_url) {
			authorImg = `<img class="icon" src="${embed.author.icon_url}" />`
		}

		if (embed.footer.icon_url) {
			footerImg = `<img class="icon" src="${embed.footer.icon_url}" />`
		}

		embed.fields.forEach(f => {
			if(!f.name)
				f.name = "Name cannot be empty"

			if(!f.value)
				f.value = "Value cannot be empty"

			fieldsHTML += `
				<div class="field">
					<p>${f.name}</p>
					${f.value}
				</div>
			`
		})

		return `
			<div class="avatar">
				<img class="avatar" ${avatarImg} />
			</div>
			<div class="message">
				<div class="message-author">${props.embed.username}</div>
				<p class="content">${props.embed.content}</p>
				<div class="embed" style="border-color: #${embed.color.toString(16)}">
					<div>
						<div class="main">
							<a class="author" ${authorURL}>${authorImg}${embed.author.name}</a>
							<a class="title" ${titleURL}>${embed.title}</a>
							<p class="description">${embed.description}</p>
							<div class="fields">
								${fieldsHTML}
							</div>
						</div>
						<div class="thumbnail">
							<img ${thumbImg} />
						</div>
					</div>
					<img class="image" ${imageImg} />
					<div class="footer">${footerImg}${embed.footer.text}</div>
				</div>
			</div>
		`
	}
})

var controls = new Reef("#controls", {
	template: function () {
		let e = preview.data.embed.embeds[0],
			fields = ""

		for (i=0; i<e.fields.length; i++) {
			fields += `
			<div class="field">
				Embed ${i+1} <a onclick="rmField(${i})">[−]</a>
				<input 
					type="text"
					placeholder="Name"
					value="${e.fields[i].name}" 
					onchange="updateField(this, '${i}', 'name')"
				/>
				<input 
					type="text" 
					placeholder="Value"
					value="${e.fields[i].value}" 
					onchange="updateField(this, '${i}', 'value')"
				/>
			</div>
			`
		}

		return `
		<div class="control">
			<h3>Author</h3>
			Username
			<input type="text" value="${preview.data.embed.username}" onchange="updateInput(this, 'username')" />
			Avatar URL
			<input type="text" onchange="updateInput(this, 'avatar_url')" />
		</div>
		<div class="control">
			<h3>Content</h3>
			<textarea onchange="updateInput(this, 'content')"></textarea>
		</div>
		<div class="control">
			<h3>Embed</h3>
			<div class="control">
				<h4>Author</h4>
				Author Name
				<input type="text" value="${e.author.name}" onchange="updateEmbed(this, 'author', 'name')" />
				Author URL
				<input type="text" value="${e.author.url}" onchange="updateEmbed(this, 'author', 'url')" />
				Author Icon URL
				<input type="text" value="${e.author.icon_url}" onchange="updateEmbed(this, 'author', 'icon_url')" />
			</div>
			<div class="control">
				<h4>Main</h4>
				Title
				<input type="text" value="${e.title}" onchange="updateEmbed(this, 'title')" />
				Title URL (Hyperlinked)
				<input type="text" value="${e.url}" onchange="updateEmbed(this, 'url')" />
				Description
				<textarea onchange="updateEmbed(this, 'description')">${e.description}</textarea>
			</div>
			<div class="control">
				<h4>Fields <a onclick="addField(-1)">[+]</a></h4>
				${fields}
			</div>
			<div class="control">
				<h4>Images</h4>
				Thumbnail URL
				<input type="text" value="${e.thumbnail.url}" onchange="updateEmbed(this, 'thumbnail', 'url')">
				Image URL
				<input type="text" value="${e.image.url}" onchange="updateEmbed(this, 'image', 'url')">
			</div>
			<div class="control">
				<h4>Footer</h4>
				Text
				<input type="text" value="${e.footer.text}" onchange="updateEmbed(this, 'footer', 'text')" />
				Image URL
				<input type="text" value="${e.footer.icon_url}" onchange="updateEmbed(this, 'footer', 'icon_url')" />
			</div>
		</div>
		`
	}
})

controls.render()

function updateEmbed(elem, e1, e2 = null) {
	if (e2) {
		preview.data.embed.embeds[0][e1][e2] = elem.value
	} else {
		preview.data.embed.embeds[0][e1] = elem.value
	}

	preview.render()
}

function updateField(elem, entry, item) {
	preview.data.embed.embeds[0].fields[entry][item] = elem.value
	preview.render()
}

function updateInput(elem, e) {
	preview.data.embed[e] = elem.value
	preview.render()
}

function updateInputs() {
	let ev = new Event("change")
	
	document.querySelectorAll('input[type="text"]').forEach(e => {
		e.dispatchEvent(ev)
	})
}

updateInputs()

function addField(i) {
	if (preview.data.embed.embeds[0].fields.length > 12) {
		console.log("Max field limit reached!")
	}

	let thing = {
		"name": "Empty name",
		"value": "Empty value",
		"inline": false,
	}

	if (i < 0)
		preview.data.embed.embeds[0].fields.push(thing)
	else 
		preview.data.embed.embeds[0].fields.splice(i, 0, thing)

	preview.render()
	controls.render()
}

function rmField(i) {
	preview.data.embed.embeds[0].fields.splice(i, 1)
	preview.render()
	controls.render()
}

function enter() {
    if (event.key === 'Enter') {
        sendembed()       
    }
}

function sendembed() {
	let elem = document.getElementById("webhookURL")

	if (!elem.value) {
		return alert("no.")
	}

	fetch(elem.value, {
		method: "POST",
		headers: {
            "Content-Type": "application/json",
        },
		body: JSON.stringify(preview.data.embed)
	}).then(() => {
		if (response.ok) {
			console.log("Success!")
		} else {
			alert("Couldn't send embed!")
		}
	}).catch(e => {
		alert("Error!", e)
	})
} 

preview.render()
