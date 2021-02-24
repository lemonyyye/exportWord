<!--
/**
 * @description: 报告页面及导出
 * @author: lemon
 * @date: 2020-1-28
 */
-->
<template>
    <div class="layout">
        <button @click="exportWord">
            导出Word
        </button>
        <div class="report">
            <div class="report-title">年度工作报告</div>
            <div class="report-introduce">世界顶尖科学家协会(World Laureates Association,简称顶科协、WLA)首次面向全球发布年度报告。（内容纯属虚构）</div>
            <div class="report-content">
                <FirstQuarter @returnData="returnData"></FirstQuarter>
                <!-- 其他子组件 略 -->
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { } from 'ant-design-vue'
    import JSZipUtils from 'jszip-utils'
    import Docxtemplater from 'docxtemplater'
    import {
        saveAs
    } from 'file-saver'
    import PizZip from 'pizzip'
    import FirstQuarter from './Modules/FirstQuarter.vue' // 第一季度情况

    export default {
        components: {
            FirstQuarter
        },
        data() {
            return {
                year: '2020',
                // wordData作为导出到word文档的总对象
                wordData: {
                    year: this.year
                }
            }
        },
        methods: {
            // 每个子组件把值返回添加到wordData
            returnData(option) {
                this.wordData = Object.assign(this.wordData, option)
            },
            // 获取图片宽高
            getImgSize(base64Value) {
                return new Promise((resolve, reject) => {
                    let image = new Image()
                    image.src = base64Value
                    image.onload = function () {
                        const forceWidth = 650
                        const ratio = forceWidth / image.width
                        resolve([
                            forceWidth,
                            Math.round(image.height * ratio)
                        ])
                    }
                    image.onerror = function (e) {
                        reject(e)
                    }
                })
            },
            // 点击导出成word文档
            base64DataURLToArrayBuffer(dataURL) {
                const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/
                if (!base64Regex.test(dataURL)) {
                    return false
                }
                const stringBase64 = dataURL.replace(base64Regex, '')
                let binaryString
                if (typeof window !== 'undefined') {
                    binaryString = window.atob(stringBase64)
                } else {
                    binaryString = Buffer.alloc(stringBase64, 'base64').toString('binary')
                }
                const len = binaryString.length
                const bytes = new Uint8Array(len)
                for (let i = 0; i < len; i++) {
                    const ascii = binaryString.charCodeAt(i)
                    bytes[i] = ascii
                }
                return bytes.buffer
            },
            exportWord() {
                let ImageModule = require('docxtemplater-image-module-free')
                // var HTMLModule = require("docxtemplater-html-module");
                // 模板文件规定放在public目录下，我们在导出的时候，会根据此模板来导出对应的数据
                let docxsrc = '/aaa.docx'
                let _this = this
                // 读取并获得模板文件的二进制内容
                JSZipUtils.getBinaryContent(docxsrc, function (error, content) {
                    if (error) {
                        throw error
                    }
                    let opts = {}
                    opts.centered = true
                    opts.fileType = 'docx'
                    opts.getImage = function (chartId) {
                        return _this.base64DataURLToArrayBuffer(chartId)
                    }
                    // 想要等待图片能拿到之后获取原本的宽高，然而一用async导出的word文档就有问题
                    // 解决办法：包含异步数据，“设置模板变量的值”用resolveData，在回调之后再处理，如果都是同步数据，直接用setData就可以
                    opts.getSize = async function (img, tagValue) {
                        let res = await _this.getImgSize(tagValue)
                        return res
                    }

                    let imageModule = new ImageModule(opts)
                    // var htmlModule = new HTMLModule({});

                    // 创建一个PizZip实例，内容为模板的内容
                    let zip = new PizZip(content)
                    // 创建并加载docx templater实例对象
                    let doc = new Docxtemplater().loadZip(zip).attachModule(imageModule).compile()

                    // 设置模板变量的值
                    doc.resolveData({
                        wordData: _this.wordData
                    }).then(() => {
                        try {
                            // 用模板变量的值替换所有模板变量
                            doc.render()
                        } catch (error) {
                            let e = {
                                message: error.message,
                                name: error.name,
                                stack: error.stack,
                                properties: error.properties
                            }
                            throw e
                        }

                        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
                        let out = doc.getZip().generate({
                            type: 'blob',
                            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                        })
                        // 将目标文件对象保存为目标类型的文件，并命名
                        saveAs(out, 'exportWord.docx')
                    })
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    @padding-md: '20px';

    .layout {
        .report {
            background: #FFFFFF;
            padding: @padding-md;

            .report-title {
                text-align: center;
                line-height: 33px;
                font-weight: bold;
                font-size: 24px;
                color: #52596F;
                padding: 15px 0 30px;
            }

            .report-introduce {
                text-align: center;
                font-size: 16px;
                color: #52596F;
                line-height: 27px;
                padding-bottom: 20px;
            }

            .report-content {
                /deep/ .first-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #52596F;
                    line-height: 30px;
                    padding-bottom: 18px;
                    margin-left: -10px;
                }

                /deep/ .second-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #52596F;
                    line-height: 26px;
                    padding-bottom: 5px;
                }

                /deep/ .paragraph {
                    font-size: 16px;
                    color: #52596F;
                    line-height: 28px;
                    text-indent: 2em;
                }

                /deep/ .min-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #52596F;
                    line-height: 28px;
                    padding-bottom: 10px;
                }
            }
        }
    }
</style>