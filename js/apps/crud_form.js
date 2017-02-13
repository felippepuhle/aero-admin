(function ($) {

    /* ----------------------- *
     * Apply jQuery FileUpload *
     * ----------------------- */
	var applyFileUpload = function(jElement) {
		// Verify if gallery collection element exists
		if(jElement.find('.collection').length < 1) {
			var collectionHtml = '';
			collectionHtml += '<div class="row no-gutter margin-bottom-0">';
			collectionHtml += '	<div class="col s12">';
			collectionHtml += '		<ul class="collection hide">';
			collectionHtml += '		</ul>';
			collectionHtml += '	</div>';
			collectionHtml += '</div>';

			jElement.append(collectionHtml)
		}

        // Plugins options
        var pluginOptions = {
            url: '/apps_crud_upload.php',
            dataType: 'json',
            dropZone: jElement,
            autoUpload: true,
            previewMaxWidth: 42,
            previewMaxHeight: 42,
            previewCrop: false,
            filesContainer: jElement.find('.collection'),
            uploadTemplateId: null,
            downloadTemplateId: null,
            uploadTemplate: function (o) {
                return handleUploadTemplate(jElement, o);
            },
            downloadTemplate: function (o) {
                return handleDownloadTemplate(jElement, o);
            }
        };

        // DropZone
        if(jElement.find('dropzone').length > 0) {
            pluginOptions.dropZone = jElement.find('dropzone');
        }

		// Apply the plugin
		jElement.fileupload(pluginOptions);
	};


    /* --------------- *
     * Upload template *
     * --------------- */
    var handleUploadTemplate = function (jElement, o) {
        var uploadHtml = '';

        // Show the collection element
        jElement.find('.collection').removeClass('hide');

        $.each(o.files, function (fileIndex, file) {
            uploadHtml += '<li class="collection-item avatar file upload">';
            uploadHtml += ' <div class="fileupload-progress progress">';
            uploadHtml += '     <div class="progress-bar determinate" style="width: 0%;"></div>';
            uploadHtml += ' </div>';
            uploadHtml += handleUploadPreview(file);
            uploadHtml += ' <span class="title">' + file.name + '</span>';
            uploadHtml += ' <p>' + getSize(file) + '</p>';
            uploadHtml += '	<span class="secondary-content grey-text">';
            uploadHtml += '		<i class="material-icons">query_builder</i>';
            uploadHtml += '	</span>';
            uploadHtml += '</li>';
        });

        return uploadHtml;
    };

    var handleUploadPreview = function (file) {
		if (file.type.match('image.*')) {
    		return '<div class="preview circle"></div>';
    	}

    	return getIconPreview(file);
    };


    /* ----------------- *
     * Download template *
     * ----------------- */
    var handleDownloadTemplate = function (jElement, o) {
        var downloadHtml = '';

        // Show the collection element
        jElement.find('.collection').removeClass('hide');

        $.each(o.files, function (fileIndex, file) {
            if(typeof file.name !== typeof undefined) {
                downloadHtml += handleDownloadFile(file);
            } else {
                Materialize.toast(file.error, 5000, 'error');
            }
        	
        });

        // If no item is displayed, hide the collection element
        setTimeout(function() {
            if(jElement.find('.collection').children().length < 1) {
                jElement.find('.collection').addClass('hide');
            }
        }, 10)

        return downloadHtml;
    };

    var handleDownloadFile = function(file) {
        var iconClass = 'green-text';
        var iconText = 'check';
        if (file.error === 1) {
            iconClass = 'red-text';
            iconText = 'close';
        }

        var downloadHtml = '';
        downloadHtml += '<li class="collection-item avatar file download">';
        downloadHtml += handleDownloadPreview(file);
        downloadHtml += ' <span class="title">' + file.name + '</span>';
        downloadHtml += ' <p>' + getSize(file) + '</p>';
        downloadHtml += ' <span class="secondary-content ' + iconClass + '">';
        downloadHtml += '   <i class="material-icons">' + iconText + '</i>';
        downloadHtml += ' </span>';
        downloadHtml += '</li>';

        return downloadHtml;
    };

    var handleDownloadPreview = function (file) {
		if (file.type.match('image.*') && typeof file.url !== typeof undefined) {
    		return '<div class="circle"><img src="'+ file.url +'" alt="' + file.name + '"/></div>';
    	}

    	return getIconPreview(file);
    };



    /* ----- *
     * Utils *
     * ----- */
    var getIconPreview = function(file) {
    	var iconClass = '';

    	var fileExtension = file.name.substring(file.name.lastIndexOf(".") + 1);
        switch (fileExtension) {
            case 'doc':
            case 'dot':
            case 'docx':
            case 'docm':
            case 'dotx':
            case 'dotm':
            case 'docb':
                iconClass = 'fa fa-file-word-o';
                break;
            case 'xls':
            case 'xlt':
            case 'xlm':
            case 'xlsx':
            case 'xlsm':
            case 'xltx':
            case 'xltm':
            case 'xlsb':
            case 'xla':
            case 'xlam':
            case 'xll':
            case 'xlw':
                iconClass = 'fa fa-file-excel-o';
                break;
            case 'ppt':
            case 'pot':
            case 'pps':
            case 'pptx':
            case 'pptm':
            case 'potx':
            case 'potm':
            case 'ppam':
            case 'ppsx':
            case 'ppsm':
            case 'sldx':
            case 'sldm':
                iconClass = 'fa fa-file-powerpoint-o';
                break;
            case 'pdf':
                iconClass = 'fa fa-file-pdf-o';
                break;
            case 'txt':
                iconClass = 'fa fa-file-text-o';
                break;
            case 'zip':
            case 'gzip':
            case 'gz':
            case '7z':
            case 'rar':
                iconClass = 'fa fa-file-archive-o';
                break;
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'gif':
                iconClass = 'fa fa-file-image-o';
                break;
            default:
                iconClass = 'fa fa-file-o';
        }

        return '<i class="circle ' + iconClass + '" title="' + file.name + '"></i>';
    };

    var getSize = function(file) {
    	if(file.size > (1024 * 1024)) {
    		return parseFloat(file.size / 1024 / 1024).toFixed(2) + ' mb';
    	}


    	return parseFloat(file.size / 1024).toFixed(2) + ' kb';
    };


    /* -------- *
     * DOM LOAD *
     * -------- */
    $(document).ready(function() {
    	// Apply jQuery FileUpload
		$('.input-fileupload').each(function() {
			var jElement = $(this);

			applyFileUpload(jElement);
		});

		// Verify if server is online
		if ($.support.cors) {
			$.ajax({ type: 'HEAD', url: '/apps_crud_upload.php' }).fail(function () {
				Materialize.toast('Upload server has gone away.', 5000, 'error');
			});
		}

        // Apply jQuery Select2
        $('.input-select2 select').select2();

	});

 }(jQuery));