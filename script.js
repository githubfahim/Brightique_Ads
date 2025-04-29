script = """
    document.querySelectorAll('.carousel-container a').forEach(function(link) {
        link.style.display = 'block';
        link.style.width = '100%';
        link.style.height = 'auto';
    });

    document.querySelectorAll('.carousel-image').forEach(function(img) {
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.height = 'auto';
        img.style.objectFit = 'contain';
        img.style.border = 'none';
        img.style.cursor = 'pointer';
    });
"""
