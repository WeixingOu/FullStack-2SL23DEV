window.onload = function (){
    const navPath = document.querySelector('.breadcrumbs > ul');

    function insertPathsData() {
        data.paths.forEach(path => {
            const liNavitem = document.createElement('li');
            const aNavlink = document.createElement('a');
            aNavlink.href = path.url;
            aNavlink.textContent = path.title;
            aNavlink.classList.add('text-[13px]')
            liNavitem.appendChild(aNavlink);
            navPath.appendChild(liNavitem);
        })
    }
    insertPathsData();
    
    function lgImageBind() {
        const imageSM = document.getElementById('imageSM');
        imageSM.onmouseenter = function () {
            // Create mask
            const mask = document.createElement('div');
            mask.classList.add('w-48', 'h-48', 'bg-white', 'opacity-50', 'border-[1px]', 'border-solid', 'border-[#ddd]', 'absolute', 'top-0', 'left-0');
            imageSM.appendChild(mask);
    
            // <!-- Image LG -->
            const contenedorDiv = document.createElement("div");
            contenedorDiv.classList.add("w-[400px]", "h-[400px]", "border-[1px]", "border-solid", "border-[#dfdfdf]", "absolute", "top-0", "left-[420px]", "overflow-hidden");
            const internoDiv = document.createElement("div");
            internoDiv.classList.add("w-[800px]", "h-[800px]", 'aboslute');
            const img = document.createElement("img");
            img.classList.add("w-full", 'aboslute');
            img.src = "./img/lg1.png";
            internoDiv.appendChild(img);
            contenedorDiv.appendChild(internoDiv);
            const leftTop = document.getElementById('leftTop');
            leftTop.appendChild(contenedorDiv);
    
            // Move Mask
            imageSM.onmousemove = function(e) {
                let left = e.clientX - imageSM.getBoundingClientRect().left - mask.offsetWidth / 2;
                let top = e.clientY - imageSM.getBoundingClientRect().top - mask.offsetHeight / 2;
                if (left < 0){
                    left = 0;
                } else if (left > imageSM.clientWidth - mask.offsetWidth) {
                    left = imageSM.clientWidth - mask.offsetWidth;
                }
                if (top < 0){
                    top = 0;
                } else if (top > imageSM.clientHeight - mask.offsetHeight) {
                    top = imageSM.clientHeight - mask.offsetHeight;
                }
                mask.style.left = `${left}px`;
                mask.style.top = `${top}px`;

                let scaleX = (internoDiv.offsetWidth - contenedorDiv.offsetWidth) / (imageSM.clientWidth - mask.offsetWidth);
                let scaleY = (internoDiv.offsetHeight - contenedorDiv.offsetHeight) / (imageSM.clientHeight - mask.offsetHeight);
                img.style.transform = `translate(${-left * scaleX}px, ${-top * scaleY}px)`;
            }
    
            imageSM.onmouseleave = function() {
                imageSM.removeChild(mask);
                leftTop.removeChild(contenedorDiv);
            }
        }
    }
    lgImageBind();
}