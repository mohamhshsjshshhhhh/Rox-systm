<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rox Dashboard - Bot Control Center</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap');
        
        :root {
            --primary: #5865F2;
            --primary-dark: #4752C4;
            --secondary: #EB459E;
            --success: #3BA55D;
            --warning: #FAA61A;
            --danger: #ED4245;
            --dark: #1a1b1e;
            --darker: #111214;
            --card: #2f3136;
            --text: #dcddde;
            --text-muted: #96989d;
            --border: #40444b;
            --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            --shadow: 0 8px 32px rgba(0,0,0,0.4);
            --shadow-glow: 0 0 40px rgba(88, 101, 242, 0.3);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Cairo', sans-serif;
            background: var(--darker);
            color: var(--text);
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* Animated Background */
        .bg-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: 
                radial-gradient(circle at 20% 50%, rgba(88, 101, 242, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(235, 69, 158, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 40% 20%, rgba(59, 165, 93, 0.1) 0%, transparent 50%);
            animation: bgPulse 8s ease-in-out infinite;
        }

        @keyframes bgPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        /* Glassmorphism Effect */
        .glass {
            background: rgba(47, 49, 54, 0.7);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Layout */
        .container {
            display: grid;
            grid-template-columns: 280px 1fr;
            min-height: 100vh;
        }

        /* Sidebar */
        .sidebar {
            background: var(--dark);
            border-left: 1px solid var(--border);
            padding: 20px;
            position: fixed;
            height: 100vh;
            width: 280px;
            overflow-y: auto;
            z-index: 100;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px;
            margin-bottom: 30px;
            background: var(--gradient-1);
            border-radius: 20px;
            box-shadow: var(--shadow-glow);
        }

        .logo-icon {
            width: 50px;
            height: 50px;
            background: white;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: var(--primary);
        }

        .logo-text h1 {
            font-size: 24px;
            font-weight: 900;
            background: linear-gradient(to right, #fff, #c9c9c9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .logo-text span {
            font-size: 12px;
            color: rgba(255,255,255,0.8);
            font-weight: 600;
        }

        .nav-section {
            margin-bottom: 25px;
        }

        .nav-title {
            font-size: 11px;
            text-transform: uppercase;
            color: var(--text-muted);
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 10px;
            padding: 0 15px;
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 15px;
            margin-bottom: 5px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: var(--text-muted);
            font-weight: 600;
            position: relative;
            overflow: hidden;
        }

        .nav-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 3px;
            background: var(--primary);
            transform: scaleY(0);
            transition: transform 0.3s ease;
        }

        .nav-item:hover, .nav-item.active {
            background: rgba(88, 101, 242, 0.1);
            color: var(--text);
        }

        .nav-item.active::before {
            transform: scaleY(1);
        }

        .nav-item i {
            width: 24px;
            text-align: center;
            font-size: 18px;
        }

        .nav-item .badge {
            margin-right: auto;
            background: var(--danger);
            color: white;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 11px;
            font-weight: 700;
        }

        /* Main Content */
        .main {
            margin-right: 280px;
            padding: 30px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding: 20px;
            background: var(--card);
            border-radius: 20px;
            border: 1px solid var(--border);
        }

        .header-title h2 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 5px;
        }

        .header-title p {
            color: var(--text-muted);
            font-size: 14px;
        }

        .header-actions {
            display: flex;
            gap: 15px;
        }

        .btn {
            padding: 12px 24px;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            font-family: 'Cairo', sans-serif;
            font-weight: 700;
            font-size: 14px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .btn-primary {
            background: var(--primary);
            color: white;
        }

        .btn-primary:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(88, 101, 242, 0.4);
        }

        .btn-danger {
            background: var(--danger);
            color: white;
        }

        .btn-success {
            background: var(--success);
            color: white;
        }

        .btn-secondary {
            background: var(--border);
            color: var(--text);
        }

        /* Stats Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: var(--card);
            padding: 25px;
            border-radius: 20px;
            border: 1px solid var(--border);
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-5px);
        }

        .stat-card::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            height: 100%;
            background: linear-gradient(to left, rgba(255,255,255,0.03), transparent);
        }

        .stat-icon {
            width: 60px;
            height: 60px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            margin-bottom: 15px;
        }

        .stat-card:nth-child(1) .stat-icon { background: rgba(88, 101, 242, 0.2); color: var(--primary); }
        .stat-card:nth-child(2) .stat-icon { background: rgba(59, 165, 93, 0.2); color: var(--success); }
        .stat-card:nth-child(3) .stat-icon { background: rgba(235, 69, 158, 0.2); color: var(--secondary); }
        .stat-card:nth-child(4) .stat-icon { background: rgba(250, 166, 26, 0.2); color: var(--warning); }

        .stat-value {
            font-size: 36px;
            font-weight: 900;
            margin-bottom: 5px;
        }

        .stat-label {
            color: var(--text-muted);
            font-size: 14px;
            font-weight: 600;
        }

        .stat-change {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            margin-top: 10px;
            font-size: 12px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 20px;
        }

        .stat-change.positive {
            background: rgba(59, 165, 93, 0.2);
            color: var(--success);
        }

        /* Content Sections */
        .content-section {
            display: none;
            animation: fadeIn 0.5s ease;
        }

        .content-section.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
        }

        .section-title {
            font-size: 22px;
            font-weight: 700;
        }

        /* Cards */
        .card {
            background: var(--card);
            border-radius: 20px;
            border: 1px solid var(--border);
            padding: 25px;
            margin-bottom: 25px;
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--border);
        }

        .card-title {
            font-size: 18px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        /* Command Manager */
        .command-grid {
            display: grid;
            gap: 15px;
        }

        .command-item {
            background: var(--dark);
            padding: 20px;
            border-radius: 15px;
            border: 1px solid var(--border);
            display: flex;
            align-items: center;
            gap: 15px;
            transition: all 0.3s ease;
            position: relative;
        }

        .command-item:hover {
            border-color: var(--primary);
            transform: translateX(-5px);
        }

        .command-icon {
            width: 50px;
            height: 50px;
            background: var(--gradient-1);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }

        .command-info {
            flex: 1;
        }

        .command-name {
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 3px;
        }

        .command-desc {
            color: var(--text-muted);
            font-size: 13px;
        }

        .command-actions {
            display: flex;
            gap: 10px;
        }

        .btn-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            border: none;
            background: var(--border);
            color: var(--text);
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .btn-icon:hover {
            background: var(--primary);
            color: white;
            transform: scale(1.1);
        }

        .btn-icon.delete:hover {
            background: var(--danger);
        }

        /* Toggle Switch */
        .toggle {
            position: relative;
            width: 50px;
            height: 26px;
        }

        .toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--border);
            transition: .3s;
            border-radius: 34px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 4px;
            bottom: 4px;
            background: white;
            transition: .3s;
            border-radius: 50%;
        }

        input:checked + .slider {
            background: var(--success);
        }

        input:checked + .slider:before {
            transform: translateX(24px);
        }

        /* Bot Settings */
        .settings-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }

        .setting-item {
            background: var(--dark);
            padding: 20px;
            border-radius: 15px;
            border: 1px solid var(--border);
        }

        .setting-label {
            font-weight: 700;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .setting-input {
            width: 100%;
            padding: 12px 15px;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 10px;
            color: var(--text);
            font-family: 'Cairo', sans-serif;
            font-size: 14px;
            transition: all 0.3s ease;
        }

        .setting-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(88, 101, 242, 0.1);
        }

        .bot-preview {
            text-align: center;
            padding: 40px;
            background: var(--gradient-1);
            border-radius: 20px;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
        }

        .bot-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 5px solid rgba(255,255,255,0.2);
            margin-bottom: 20px;
            object-fit: cover;
            position: relative;
            z-index: 1;
        }

        .bot-status {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(0,0,0,0.3);
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
        }

        .status-dot {
            width: 10px;
            height: 10px;
            background: var(--success);
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        /* AI Assistant */
        .ai-container {
            display: grid;
            grid-template-columns: 1fr 350px;
            gap: 25px;
            height: 600px;
        }

        .chat-area {
            background: var(--card);
            border-radius: 20px;
            border: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .chat-header {
            padding: 20px;
            background: var(--dark);
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .ai-avatar {
            width: 45px;
            height: 45px;
            background: var(--gradient-2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }

        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .message {
            max-width: 80%;
            padding: 15px 20px;
            border-radius: 20px;
            font-size: 14px;
            line-height: 1.6;
            animation: messageSlide 0.3s ease;
        }

        @keyframes messageSlide {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .message.user {
            align-self: flex-end;
            background: var(--primary);
            color: white;
            border-bottom-right-radius: 5px;
        }

        .message.ai {
            align-self: flex-start;
            background: var(--dark);
            border: 1px solid var(--border);
            border-bottom-left-radius: 5px;
        }

        .chat-input-area {
            padding: 20px;
            background: var(--dark);
            border-top: 1px solid var(--border);
            display: flex;
            gap: 10px;
        }

        .chat-input {
            flex: 1;
            padding: 15px 20px;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 15px;
            color: var(--text);
            font-family: 'Cairo', sans-serif;
            font-size: 14px;
        }

        .chat-input:focus {
            outline: none;
            border-color: var(--primary);
        }

        .ai-sidebar {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .quick-actions {
            background: var(--card);
            border-radius: 20px;
            border: 1px solid var(--border);
            padding: 20px;
        }

        .quick-action-btn {
            width: 100%;
            padding: 15px;
            margin-bottom: 10px;
            background: var(--dark);
            border: 1px solid var(--border);
            border-radius: 12px;
            color: var(--text);
            font-family: 'Cairo', sans-serif;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: right;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .quick-action-btn:hover {
            background: var(--primary);
            border-color: var(--primary);
            transform: translateX(-5px);
        }

        /* Embed Builder */
        .embed-builder {
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 25px;
        }

        .embed-preview {
            background: #36393f;
            border-radius: 20px;
            padding: 25px;
            min-height: 500px;
        }

        .discord-embed {
            background: #2f3136;
            border-left: 4px solid var(--primary);
            border-radius: 4px;
            padding: 15px;
            max-width: 100%;
        }

        .embed-author {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: 600;
            color: white;
        }

        .embed-author img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
        }

        .embed-title {
            font-size: 16px;
            font-weight: 700;
            color: white;
            margin-bottom: 10px;
        }

        .embed-description {
            font-size: 14px;
            color: #dcddde;
            line-height: 1.5;
            margin-bottom: 10px;
        }

        .embed-fields {
            display: grid;
            gap: 10px;
            margin-bottom: 10px;
        }

        .embed-field {
            font-size: 14px;
        }

        .embed-field-name {
            font-weight: 700;
            color: white;
            margin-bottom: 5px;
        }

        .embed-field-value {
            color: #dcddde;
        }

        .embed-image {
            width: 100%;
            border-radius: 4px;
            margin-top: 10px;
        }

        .embed-footer {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
            font-size: 12px;
            color: #96989d;
        }

        .embed-controls {
            background: var(--card);
            border-radius: 20px;
            border: 1px solid var(--border);
            padding: 25px;
            max-height: 600px;
            overflow-y: auto;
        }

        .color-picker {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }

        .color-option {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            cursor: pointer;
            border: 3px solid transparent;
            transition: all 0.3s ease;
        }

        .color-option:hover, .color-option.active {
            border-color: white;
            transform: scale(1.1);
        }

        /* Modal */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(5px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .modal-overlay.active {
            display: flex;
        }

        .modal {
            background: var(--card);
            border-radius: 20px;
            border: 1px solid var(--border);
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow: hidden;
            animation: modalSlide 0.3s ease;
        }

        @keyframes modalSlide {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }

        .modal-header {
            padding: 25px;
            background: var(--dark);
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-title {
            font-size: 20px;
            font-weight: 700;
        }

        .modal-close {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            border: none;
            background: var(--border);
            color: var(--text);
            cursor: pointer;
            font-size: 20px;
            transition: all 0.3s ease;
        }

        .modal-close:hover {
            background: var(--danger);
            color: white;
        }

        .modal-body {
            padding: 25px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            font-weight: 700;
            margin-bottom: 8px;
            font-size: 14px;
        }

        .form-input, .form-select {
            width: 100%;
            padding: 12px 15px;
            background: var(--dark);
            border: 1px solid var(--border);
            border-radius: 10px;
            color: var(--text);
            font-family: 'Cairo', sans-serif;
            font-size: 14px;
        }

        .form-input:focus, .form-select:focus {
            outline: none;
            border-color: var(--primary);
        }

        .modal-footer {
            padding: 20px 25px;
            background: var(--dark);
            border-top: 1px solid var(--border);
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

        /* Toast Notifications */
        .toast-container {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 2000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .toast {
            background: var(--card);
            border-radius: 12px;
            padding: 15px 20px;
            border-right: 4px solid var(--primary);
            box-shadow: var(--shadow);
            display: flex;
            align-items: center;
            gap: 12px;
            animation: toastSlide 0.3s ease;
            min-width: 300px;
        }

        @keyframes toastSlide {
            from { opacity: 0; transform: translateX(-100%); }
            to { opacity: 1; transform: translateX(0); }
        }

        .toast.success { border-right-color: var(--success); }
        .toast.error { border-right-color: var(--danger); }
        .toast.warning { border-right-color: var(--warning); }

        /* Responsive */
        @media (max-width: 1024px) {
            .container {
                grid-template-columns: 1fr;
            }
            .sidebar {
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .sidebar.active {
                transform: translateX(0);
            }
            .main {
                margin-right: 0;
            }
            .ai-container, .embed-builder {
                grid-template-columns: 1fr;
            }
        }

        /* Loading Animation */
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            background: var(--dark);
        }

        ::-webkit-scrollbar-thumb {
            background: var(--border);
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: var(--primary);
        }

        .shortcut-tag {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            background: rgba(88, 101, 242, 0.2);
            color: var(--primary);
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            margin-right: 10px;
        }

        .danger-zone {
            border: 2px solid var(--danger);
            border-radius: 20px;
            padding: 25px;
            margin-top: 25px;
        }

        .danger-title {
            color: var(--danger);
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="bg-animation"></div>
    
    <div class="container">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="logo">
                <div class="logo-icon">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="logo-text">
                    <h1>ROX BOT</h1>
                    <span>Control Center</span>
                </div>
            </div>

            <div class="nav-section">
                <div class="nav-title">القائمة الرئيسية</div>
                <div class="nav-item active" onclick="showSection('dashboard')">
                    <i class="fas fa-home"></i>
                    <span>لوحة التحكم</span>
                </div>
                <div class="nav-item" onclick="showSection('commands')">
                    <i class="fas fa-terminal"></i>
                    <span>الأوامر</span>
                    <span class="badge" id="cmd-count">25</span>
                </div>
                <div class="nav-item" onclick="showSection('bot-settings')">
                    <i class="fas fa-cog"></i>
                    <span>إعدادات البوت</span>
                </div>
                <div class="nav-item" onclick="showSection('embed-builder')">
                    <i class="fas fa-paint-brush"></i>
                    <span>مصمم الإيمبد</span>
                </div>
            </div>

            <div class="nav-section">
                <div class="nav-title">الأدوات المتقدمة</div>
                <div class="nav-item" onclick="showSection('ai-assistant')">
                    <i class="fas fa-brain"></i>
                    <span>المساعد الذكي</span>
                    <span class="badge" style="background: var(--success);">AI</span>
                </div>
                <div class="nav-item" onclick="showSection('broadcast')">
                    <i class="fas fa-broadcast-tower"></i>
                    <span>الإذاعة</span>
                </div>
                <div class="nav-item" onclick="showSection('logs')">
                    <i class="fas fa-history"></i>
                    <span>السجلات</span>
                </div>
            </div>

            <div class="nav-section">
                <div class="nav-title">النظام</div>
                <div class="nav-item" onclick="restartBot()">
                    <i class="fas fa-redo"></i>
                    <span>إعادة تشغيل</span>
                </div>
                <div class="nav-item" onclick="showSection('config')">
                    <i class="fas fa-code"></i>
                    <span>ملف الإعدادات</span>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main">
            <!-- Header -->
            <div class="header">
                <div class="header-title">
                    <h2 id="page-title">لوحة التحكم</h2>
                    <p>مرحباً بك في نظام تحكم Rox Bot</p>
                </div>
                <div class="header-actions">
                    <button class="btn btn-secondary" onclick="toggleSidebar()">
                        <i class="fas fa-bars"></i>
                    </button>
                    <button class="btn btn-primary" onclick="saveAllChanges()">
                        <i class="fas fa-save"></i>
                        حفظ التغييرات
                    </button>
                </div>
            </div>

            <!-- Dashboard Section -->
            <div id="dashboard" class="content-section active">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-server"></i>
                        </div>
                        <div class="stat-value" id="guilds-count">0</div>
                        <div class="stat-label">السيرفرات</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+12% هذا الشهر</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-value" id="users-count">0</div>
                        <div class="stat-label">المستخدمين</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+5% هذا الأسبوع</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-terminal"></i>
                        </div>
                        <div class="stat-value" id="commands-used">0</div>
                        <div class="stat-label">الأوامر المنفذة</div>
                        <div class="stat-change positive">
                            <i class="fas fa-bolt"></i>
                            <span>نشط الآن</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-value" id="uptime">00:00:00</div>
                        <div class="stat-label">وقت التشغيل</div>
                        <div class="stat-change positive">
                            <i class="fas fa-check-circle"></i>
                            <span>مستقر</span>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-chart-line"></i>
                            نشاط البوت
                        </div>
                        <button class="btn btn-secondary" onclick="refreshStats()">
                            <i class="fas fa-sync-alt"></i>
                            تحديث
                        </button>
                    </div>
                    <div style="height: 300px; display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
                        <i class="fas fa-chart-area" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
                        <p>الرسم البياني للنشاط سيظهر هنا</p>
                    </div>
                </div>
            </div>

            <!-- Commands Section -->
            <div id="commands" class="content-section">
                <div class="section-header">
                    <h3 class="section-title">إدارة الأوامر</h3>
                    <button class="btn btn-primary" onclick="openAddCommandModal()">
                        <i class="fas fa-plus"></i>
                        أمر جديد
                    </button>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-list"></i>
                            قائمة الأوامر
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <input type="text" class="setting-input" placeholder="بحث..." style="width: 200px;" onkeyup="searchCommands(this.value)">
                            <button class="btn btn-secondary" onclick="toggleAllCommands()">
                                <i class="fas fa-power-off"></i>
                            </button>
                        </div>
                    </div>
                    <div class="command-grid" id="commands-list">
                        <!-- Commands will be loaded here -->
                    </div>
                </div>
            </div>

            <!-- Bot Settings Section -->
            <div id="bot-settings" class="content-section">
                <div class="bot-preview">
                    <img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="Bot Avatar" class="bot-avatar" id="bot-avatar-preview">
                    <h2 id="bot-name-preview">Rox Bot</h2>
                    <div class="bot-status">
                        <span class="status-dot"></span>
                        <span>متصل الآن</span>
                    </div>
                </div>

                <div class="settings-grid">
                    <div class="setting-item">
                        <div class="setting-label">
                            <i class="fas fa-signature"></i>
                            اسم البوت
                        </div>
                        <input type="text" class="setting-input" id="bot-name" placeholder="أدخل اسم البوت" onchange="updateBotPreview()">
                    </div>
                    <div class="setting-item">
                        <div class="setting-label">
                            <i class="fas fa-image"></i>
                            صورة البوت (رابط)
                        </div>
                        <input type="text" class="setting-input" id="bot-avatar" placeholder="رابط الصورة" onchange="updateBotPreview()">
                    </div>
                    <div class="setting-item">
                        <div class="setting-label">
                            <i class="fas fa-key"></i>
                            توكن البوت
                        </div>
                        <input type="password" class="setting-input" id="bot-token" placeholder="••••••••••••••••">
                    </div>
                    <div class="setting-item">
                        <div class="setting-label">
                            <i class="fas fa-hashtag"></i>
                            البادئة (Prefix)
                        </div>
                        <input type="text" class="setting-input" id="bot-prefix" value="/" placeholder="/">
                    </div>
                </div>

                <div class="card" style="margin-top: 25px;">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-sliders-h"></i>
                            الإعدادات المتقدمة
                        </div>
                    </div>
                    <div class="settings-grid">
                        <div class="setting-item">
                            <div class="setting-label">
                                <i class="fas fa-database"></i>
                                قاعدة البيانات
                            </div>
                            <select class="form-select">
                                <option>JSON (افتراضي)</option>
                                <option>MongoDB</option>
                                <option>MySQL</option>
                            </select>
                        </div>
                        <div class="setting-item">
                            <div class="setting-label">
                                <i class="fas fa-language"></i>
                                اللغة الافتراضية
                            </div>
                            <select class="form-select">
                                <option>العربية</option>
                                <option>English</option>
                            </select>
                        </div>
                        <div class="setting-item">
                            <div class="setting-label">
                                <i class="fas fa-shield-alt"></i>
                                وضع الصيانة
                            </div>
                            <label class="toggle">
                                <input type="checkbox" id="maintenance-mode">
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div class="setting-item">
                            <div class="setting-label">
                                <i class="fas fa-bug"></i>
                                وضع التصحيح
                            </div>
                            <label class="toggle">
                                <input type="checkbox" id="debug-mode">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="danger-zone">
                    <div class="danger-title">
                        <i class="fas fa-exclamation-triangle"></i>
                        منطقة الخطر
                    </div>
                    <p style="color: var(--text-muted); margin-bottom: 15px;">هذه الإجراءات لا يمكن التراجع عنها. استخدمها بحذر.</p>
                    <button class="btn btn-danger" onclick="resetBot()">
                        <i class="fas fa-trash"></i>
                        إعادة تعيين جميع الإعدادات
                    </button>
                </div>
            </div>

            <!-- AI Assistant Section -->
            <div id="ai-assistant" class="content-section">
                <div class="ai-container">
                    <div class="chat-area">
                        <div class="chat-header">
                            <div class="ai-avatar">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div>
                                <div style="font-weight: 700;">Rox AI Assistant</div>
                                <div style="font-size: 12px; color: var(--success);">
                                    <i class="fas fa-circle" style="font-size: 8px;"></i>
                                    متصل
                                </div>
                            </div>
                        </div>
                        <div class="chat-messages" id="chat-messages">
                            <div class="message ai">
                                مرحباً! أنا مساعد Rox الذكي. يمكنني مساعدتك في:
                                <br>• إعداد أوامر جديدة
                                <br>• تعديل إعدادات البوت
                                <br>• حل المشاكل التقنية
                                <br>• إنشاء إيمبدات احترافية
                                <br><br>كيف يمكنني مساعدتك اليوم؟
                            </div>
                        </div>
                        <div class="chat-input-area">
                            <input type="text" class="chat-input" id="ai-input" placeholder="اكتب رسالتك هنا..." onkeypress="handleAIInput(event)">
                            <button class="btn btn-primary" onclick="sendAIMessage()">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                    <div class="ai-sidebar">
                        <div class="quick-actions">
                            <h4 style="margin-bottom: 15px; font-size: 16px;">
                                <i class="fas fa-bolt"></i>
                                أوامر سريعة
                            </h4>
                            <button class="quick-action-btn" onclick="quickCommand('create welcome command')">
                                <i class="fas fa-door-open"></i>
                                إنشاء أمر ترحيب
                            </button>
                            <button class="quick-action-btn" onclick="quickCommand('setup auto role')">
                                <i class="fas fa-user-tag"></i>
                                إعداد الرتب التلقائية
                            </button>
                            <button class="quick-action-btn" onclick="quickCommand('create moderation system')">
                                <i class="fas fa-shield-alt"></i>
                                نظام الإدارة
                            </button>
                            <button class="quick-action-btn" onclick="quickCommand('setup leveling system')">
                                <i class="fas fa-trophy"></i>
                                نظام المستويات
                            </button>
                            <button class="quick-action-btn" onclick="quickCommand('fix bot errors')">
                                <i class="fas fa-wrench"></i>
                                إصلاح أخطاء البوت
                            </button>
                        </div>
                        <div class="card">
                            <div class="card-title">
                                <i class="fas fa-keyboard"></i>
                                اختصارات
                            </div>
                            <div style="font-size: 13px; color: var(--text-muted); line-height: 2;">
                                <div><kbd>Ctrl</kbd> + <kbd>K</kbd> - بحث سريع</div>
                                <div><kbd>Ctrl</kbd> + <kbd>S</kbd> - حفظ</div>
                                <div><kbd>Ctrl</kbd> + <kbd>R</kbd> - إعادة تشغيل</div>
                                <div><kbd>Esc</kbd> - إغلاق النافذة</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Embed Builder Section -->
            <div id="embed-builder" class="content-section">
                <div class="embed-builder">
                    <div class="embed-preview">
                        <div class="discord-embed" id="embed-preview-box" style="border-left-color: #5865F2;">
                            <div class="embed-author" id="embed-author-preview" style="display: none;">
                                <img src="" alt="" id="embed-author-icon">
                                <span id="embed-author-text">Author</span>
                            </div>
                            <div class="embed-title" id="embed-title-preview">عنوان الإيمبد</div>
                            <div class="embed-description" id="embed-desc-preview">هذا وصف الإيمبد يمكنك تعديله من لوحة التحكم على اليمين.</div>
                            <div class="embed-fields" id="embed-fields-preview"></div>
                            <img src="" alt="" class="embed-image" id="embed-image-preview" style="display: none;">
                            <div class="embed-footer" id="embed-footer-preview" style="display: none;">
                                <img src="" alt="" width="20" height="20" style="border-radius: 50%;" id="embed-footer-icon">
                                <span id="embed-footer-text">Footer</span>
                            </div>
                        </div>
                    </div>
                    <div class="embed-controls">
                        <h3 style="margin-bottom: 20px;">⚙️ إعدادات الإيمبد</h3>
                        
                        <div class="form-group">
                            <label class="form-label">اللون</label>
                            <div class="color-picker">
                                <div class="color-option active" style="background: #5865F2;" onclick="setEmbedColor('#5865F2')"></div>
                                <div class="color-option" style="background: #EB459E;" onclick="setEmbedColor('#EB459E')"></div>
                                <div class="color-option" style="background: #3BA55D;" onclick="setEmbedColor('#3BA55D')"></div>
                                <div class="color-option" style="background: #FAA61A;" onclick="setEmbedColor('#FAA61A')"></div>
                                <div class="color-option" style="background: #ED4245;" onclick="setEmbedColor('#ED4245')"></div>
                                <div class="color-option" style="background: #000000;" onclick="setEmbedColor('#000000')"></div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">العنوان</label>
                            <input type="text" class="form-input" id="embed-title-input" oninput="updateEmbedPreview()">
                        </div>

                        <div class="form-group">
                            <label class="form-label">الوصف</label>
                            <textarea class="form-input" id="embed-desc-input" rows="3" oninput="updateEmbedPreview()"></textarea>
                        </div>

                        <div class="form-group">
                            <label class="form-label">صورة كبيرة (URL)</label>
                            <input type="text" class="form-input" id="embed-image-input" oninput="updateEmbedPreview()">
                        </div>

                        <div class="form-group">
                            <label class="form-label">الناشر (Author)</label>
                            <input type="text" class="form-input" id="embed-author-input" placeholder="الاسم" oninput="updateEmbedPreview()">
                            <input type="text" class="form-input" id="embed-author-icon-input" placeholder="رابط الأيقونة" style="margin-top: 10px;" oninput="updateEmbedPreview()">
                        </div>

                        <div class="form-group">
                            <label class="form-label">التذييل (Footer)</label>
                            <input type="text" class="form-input" id="embed-footer-input" placeholder="النص" oninput="updateEmbedPreview()">
                            <input type="text" class="form-input" id="embed-footer-icon-input" placeholder="رابط الأيقونة" style="margin-top: 10px;" oninput="updateEmbedPreview()">
                        </div>

                        <button class="btn btn-primary" style="width: 100%; margin-top: 20px;" onclick="saveEmbed()">
                            <i class="fas fa-save"></i>
                            حفظ الإيمبد
                        </button>
                    </div>
                </div>
            </div>

            <!-- Broadcast Section -->
            <div id="broadcast" class="content-section">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-broadcast-tower"></i>
                            نظام الإذاعة
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">نوع الإذاعة</label>
                        <select class="form-select" id="broadcast-type">
                            <option value="all">جميع الأعضاء</option>
                            <option value="online">المتصلين فقط</option>
                            <option value="role">رتبة محددة</option>
                            <option value="guild">سيرفر محدد</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">الرسالة</label>
                        <textarea class="form-input" id="broadcast-message" rows="5" placeholder="اكتب رسالتك هنا..."></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">تأخير بين الرسائل (ثانية)</label>
                        <input type="number" class="form-input" id="broadcast-delay" value="1" min="0.5" max="10" step="0.5">
                    </div>
                    <div style="display: flex; gap: 10px; margin-top: 20px;">
                        <button class="btn btn-primary" onclick="sendBroadcast()">
                            <i class="fas fa-paper-plane"></i>
                            إرسال الإذاعة
                        </button>
                        <button class="btn btn-secondary" onclick="previewBroadcast()">
                            <i class="fas fa-eye"></i>
                            معاينة
                        </button>
                    </div>
                </div>

                <div class="card" style="margin-top: 25px;">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-history"></i>
                            سجل الإذاعات
                        </div>
                    </div>
                    <div id="broadcast-history">
                        <p style="color: var(--text-muted); text-align: center; padding: 40px;">
                            لا توجد إذاعات سابقة
                        </p>
                    </div>
                </div>
            </div>

            <!-- Logs Section -->
            <div id="logs" class="content-section">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-terminal"></i>
                            سجل الأحداث
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <select class="form-select" style="width: 150px;" onchange="filterLogs(this.value)">
                                <option value="all">الكل</option>
                                <option value="error">أخطاء</option>
                                <option value="warn">تحذيرات</option>
                                <option value="info">معلومات</option>
                                <option value="command">أوامر</option>
                            </select>
                            <button class="btn btn-secondary" onclick="clearLogs()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div id="logs-container" style="max-height: 500px; overflow-y: auto; font-family: 'Courier New', monospace; font-size: 13px;">
                        <!-- Logs will appear here -->
                    </div>
                </div>
            </div>

            <!-- Config Section -->
            <div id="config" class="content-section">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-code"></i>
                            محرر الإعدادات (config.js)
                        </div>
                        <div>
                            <button class="btn btn-secondary" onclick="formatConfig()">
                                <i class="fas fa-magic"></i>
                                تنسيق
                            </button>
                            <button class="btn btn-primary" onclick="saveConfig()">
                                <i class="fas fa-save"></i>
                                حفظ
                            </button>
                        </div>
                    </div>
                    <textarea class="form-input" id="config-editor" rows="25" style="font-family: 'Courier New', monospace; direction: ltr; text-align: left;"></textarea>
                </div>
            </div>
        </main>
    </div>

    <!-- Add Command Modal -->
    <div class="modal-overlay" id="command-modal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">أمر جديد</h3>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">اسم الأمر</label>
                    <input type="text" class="form-input" id="new-cmd-name" placeholder="مثال: ban">
                </div>
                <div class="form-group">
                    <label class="form-label">الوصف</label>
                    <input type="text" class="form-input" id="new-cmd-desc" placeholder="وصف مختصر للأمر">
                </div>
                <div class="form-group">
                    <label class="form-label">الاختصار</label>
                    <input type="text" class="form-input" id="new-cmd-alias" placeholder="مثال: b">
                </div>
                <div class="form-group">
                    <label class="form-label">الصلاحيات المطلوبة</label>
                    <select class="form-select" id="new-cmd-perm">
                        <option value="ADMINISTRATOR">Administrator</option>
                        <option value="MANAGE_GUILD">Manage Server</option>
                        <option value="MANAGE_MESSAGES">Manage Messages</option>
                        <option value="KICK_MEMBERS">Kick Members</option>
                        <option value="BAN_MEMBERS">Ban Members</option>
                        <option value="NONE">لا شيء</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
                <button class="btn btn-primary" onclick="addNewCommand()">إضافة</button>
            </div>
        </div>
    </div>

    <!-- Toast Container -->
    <div class="toast-container" id="toast-container"></div>

    <script>
        // Global State
        let botConfig = {
            token: '',
            clientId: '',
            guildId: '',
            prefix: '/',
            owner: '',
            probot: '',
            bank: '',
            line: '',
            taxRoomId: '',
            suggestionRoomId: '',
            azkarRoomId: '',
            azkarTime: 30,
            logChannelId: '',
            tempVoiceHubId: '',
            copyEmojiChannelId: '',
            copyStickerChannelId: '',
            memberLogChannelId: '',
            modLogChannelId: '',
            serverLogChannelId: '',
            logtickets: '',
            logbuy: '',
            Ratechannel: '',
            inforate: '',
            panel: '',
            roles: [],
            ticketCategoryId: ''
        };

        let commands = [
            { name: 'top', desc: 'عرض توب الأعضاء', alias: 't', perm: 'NONE', enabled: true },
            { name: 'lock', desc: 'قفل الروم', alias: 'l', perm: 'MANAGE_CHANNELS', enabled: true },
            { name: 'unlock', desc: 'فتح الروم', alias: 'ul', perm: 'MANAGE_CHANNELS', enabled: true },
            { name: 'hide', desc: 'إخفاء الروم', alias: 'h', perm: 'MANAGE_CHANNELS', enabled: true },
            { name: 'show', desc: 'إظهار الروم', alias: 'sh', perm: 'MANAGE_CHANNELS', enabled: true },
            { name: 'voice', desc: 'إعدادات الروم الصوتي', alias: 'vc', perm: 'NONE', enabled: true },
            { name: 'giveaway', desc: 'إنشاء Giveaway', alias: 'gw', perm: 'ADMINISTRATOR', enabled: true },
            { name: 'button', desc: 'زر فائز أول ضغطة', alias: 'btn', perm: 'ADMINISTRATOR', enabled: true },
            { name: 'setup-ticket', desc: 'تسطيب تكت', alias: 'st', perm: 'ADMINISTRATOR', enabled: true },
            { name: 'panel-ticket', desc: 'بانل التكتات', alias: 'pt', perm: 'ADMINISTRATOR', enabled: true },
            { name: 'timeout', desc: 'Timeout عضو', alias: 'to', perm: 'MODERATE_MEMBERS', enabled: true },
            { name: 'kick', desc: 'طرد عضو', alias: 'k', perm: 'KICK_MEMBERS', enabled: true },
            { name: 'ban', desc: 'حظر عضو', alias: 'b', perm: 'BAN_MEMBERS', enabled: true },
            { name: 'unban', desc: 'فك حظر', alias: 'ub', perm: 'BAN_MEMBERS', enabled: true },
            { name: 'clear', desc: 'مسح الرسائل', alias: 'c', perm: 'MANAGE_MESSAGES', enabled: true },
            { name: 'ping', desc: 'سرعة البوت', alias: 'p', perm: 'NONE', enabled: true },
            { name: 'nick', desc: 'تغيير اللقب', alias: 'nn', perm: 'MANAGE_NICKNAMES', enabled: true },
            { name: 'slowmode', desc: 'وضع البطيء', alias: 'sm', perm: 'MANAGE_CHANNELS', enabled: true },
            { name: 'copy-emoji', desc: 'نسخ ايموجي', alias: 'ce', perm: 'MANAGE_EMOJIS', enabled: true },
            { name: 'bc', desc: 'إذاعة للجميع', alias: 'broadcast', perm: 'ADMINISTRATOR', enabled: true },
            { name: 'obc', desc: 'إذاعة للمتصلين', alias: 'obroadcast', perm: 'ADMINISTRATOR', enabled: true },
            { name: 'addtokens', desc: 'إضافة بوتات', alias: 'at', perm: 'ADMINISTRATOR', enabled: true },
            { name: 'setup-apply', desc: 'تسطيب تقديم', alias: 'sa', perm: 'ADMINISTRATOR', enabled: true },
            { name: 'setup-pic', desc: 'تسطيب مسابقة صور', alias: 'sp', perm: 'ADMINISTRATOR', enabled: true }
        ];

        let logs = [];
        let startTime = Date.now();

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            loadConfig();
            renderCommands();
            startUptime();
            addLog('info', 'Dashboard initialized successfully');
            
            // Load saved config from localStorage if exists
            const saved = localStorage.getItem('rox_config');
            if (saved) {
                botConfig = JSON.parse(saved);
                applyConfigToUI();
            }
        });

        // Navigation
        function showSection(sectionId) {
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            
            document.getElementById(sectionId).classList.add('active');
            event.currentTarget.classList.add('active');
            
            const titles = {
                'dashboard': 'لوحة التحكم',
                'commands': 'إدارة الأوامر',
                'bot-settings': 'إعدادات البوت',
                'embed-builder': 'مصمم الإيمبد',
                'ai-assistant': 'المساعد الذكي',
                'broadcast': 'الإذاعة',
                'logs': 'السجلات',
                'config': 'ملف الإعدادات'
            };
            
            document.getElementById('page-title').textContent = titles[sectionId] || sectionId;
        }

        function toggleSidebar() {
            document.querySelector('.sidebar').classList.toggle('active');
        }

        // Commands Management
        function renderCommands() {
            const container = document.getElementById('commands-list');
            container.innerHTML = '';
            
            commands.forEach((cmd, index) => {
                const item = document.createElement('div');
                item.className = 'command-item';
                item.innerHTML = `
                    <div class="command-icon">
                        <i class="fas fa-terminal"></i>
                    </div>
                    <div class="command-info">
                        <div class="command-name">
                            /${cmd.name}
                            ${cmd.alias ? `<span class="shortcut-tag"><i class="fas fa-keyboard"></i> ${cmd.alias}</span>` : ''}
                        </div>
                        <div class="command-desc">${cmd.desc} | صلاحية: ${cmd.perm}</div>
                    </div>
                    <div class="command-actions">
                        <label class="toggle">
                            <input type="checkbox" ${cmd.enabled ? 'checked' : ''} onchange="toggleCommand(${index})">
                            <span class="slider"></span>
                        </label>
                        <button class="btn-icon" onclick="editCommand(${index})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deleteCommand(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                container.appendChild(item);
            });
            
            document.getElementById('cmd-count').textContent = commands.length;
        }

        function toggleCommand(index) {
            commands[index].enabled = !commands[index].enabled;
            showToast(commands[index].enabled ? 'success' : 'warning', 
                `الأمر ${commands[index].name} ${commands[index].enabled ? 'مفعل' : 'معطل'}`);
        }

        function deleteCommand(index) {
            if (confirm('هل أنت متأكد من حذف هذا الأمر؟')) {
                commands.splice(index, 1);
                renderCommands();
                showToast('success', 'تم حذف الأمر بنجاح');
            }
        }

        function editCommand(index) {
            const cmd = commands[index];
            document.getElementById('new-cmd-name').value = cmd.name;
            document.getElementById('new-cmd-desc').value = cmd.desc;
            document.getElementById('new-cmd-alias').value = cmd.alias;
            document.getElementById('new-cmd-perm').value = cmd.perm;
            openModal();
        }

        function searchCommands(query) {
            const items = document.querySelectorAll('.command-item');
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query.toLowerCase()) ? 'flex' : 'none';
            });
        }

        function toggleAllCommands() {
            const allEnabled = commands.every(c => c.enabled);
            commands.forEach(c => c.enabled = !allEnabled);
            renderCommands();
            showToast('success', allEnabled ? 'تم تعطيل جميع الأوامر' : 'تم تفعيل جميع الأوامر');
        }

        // Modal
        function openModal() {
            document.getElementById('command-modal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('command-modal').classList.remove('active');
            document.getElementById('new-cmd-name').value = '';
            document.getElementById('new-cmd-desc').value = '';
            document.getElementById('new-cmd-alias').value = '';
        }

        function openAddCommandModal() {
            openModal();
        }

        function addNewCommand() {
            const name = document.getElementById('new-cmd-name').value;
            const desc = document.getElementById('new-cmd-desc').value;
            const alias = document.getElementById('new-cmd-alias').value;
            const perm = document.getElementById('new-cmd-perm').value;
            
            if (!name) {
                showToast('error', 'يرجى إدخال اسم الأمر');
                return;
            }
            
            commands.push({ name, desc, alias, perm, enabled: true });
            renderCommands();
            closeModal();
            showToast('success', 'تم إضافة الأمر بنجاح');
        }

        // Bot Settings
        function updateBotPreview() {
            const name = document.getElementById('bot-name').value;
            const avatar = document.getElementById('bot-avatar').value;
            
            if (name) document.getElementById('bot-name-preview').textContent = name;
            if (avatar) document.getElementById('bot-avatar-preview').src = avatar;
        }

        // AI Assistant
        function handleAIInput(e) {
            if (e.key === 'Enter') sendAIMessage();
        }

        function sendAIMessage() {
            const input = document.getElementById('ai-input');
            const message = input.value.trim();
            if (!message) return;
            
            addMessage('user', message);
            input.value = '';
            
            // Simulate AI response
            setTimeout(() => {
                const response = generateAIResponse(message);
                addMessage('ai', response);
            }, 1000);
        }

        function quickCommand(cmd) {
            document.getElementById('ai-input').value = cmd;
            sendAIMessage();
        }

        function addMessage(type, text) {
            const container = document.getElementById('chat-messages');
            const msg = document.createElement('div');
            msg.className = `message ${type}`;
            msg.innerHTML = text.replace(/\n/g, '<br>');
            container.appendChild(msg);
            container.scrollTop = container.scrollHeight;
        }

        function generateAIResponse(input) {
            input = input.toLowerCase();
            
            if (input.includes('welcome') || input.includes('ترحيب')) {
                return `سأقوم بإنشاء نظام ترحيب احترافي لك:
<br><br>
1. تم إضافة أمر <code>/welcome</code>
<br>
2. يمكنك تخصيص الرسالة من إعدادات البوت
<br>
3. يدعم الإيمبدات والصور المتحركة
<br><br>
هل تريد تفعيل الترحيب الخاص أيضاً؟`;
            }
            
            if (input.includes('error') || input.includes('خطأ')) {
                return `لدي بعض الحلول للأخطاء الشائعة:
<br><br>
• <strong>خطأ في التوكن:</strong> تأكد من صحة التوكن في config.js
<br>
• <strong>صلاحيات مفقودة:</strong> تأكد من إعطاء البوت صلاحيات Administrator
<br>
• <strong>قاعدة البيانات:</strong> تأكد من وجود ملف botsData.json
<br><br>
هل تريد فحص شامل للبوت؟`;
            }
            
            return `فهمت طلبك! يمكنني مساعدتك في:
<br><br>
• إعداد أوامر جديدة مخصصة
<br>
• تعديل إعدادات البوت
<br>
• إنشاء إيمبدات احترافية
<br>
• حل المشاكل التقنية
<br><br>
يرجى توضيح ما تحتاجه بالتفصيل.`;
        }

        // Embed Builder
        function updateEmbedPreview() {
            const title = document.getElementById('embed-title-input').value;
            const desc = document.getElementById('embed-desc-input').value;
            const image = document.getElementById('embed-image-input').value;
            const author = document.getElementById('embed-author-input').value;
            const authorIcon = document.getElementById('embed-author-icon-input').value;
            const footer = document.getElementById('embed-footer-input').value;
            const footerIcon = document.getElementById('embed-footer-icon-input').value;
            
            document.getElementById('embed-title-preview').textContent = title || 'عنوان الإيمبد';
            document.getElementById('embed-desc-preview').textContent = desc || 'هذا وصف الإيمبد يمكنك تعديله من لوحة التحكم على اليمين.';
            
            const imgPreview = document.getElementById('embed-image-preview');
            if (image) {
                imgPreview.src = image;
                imgPreview.style.display = 'block';
            } else {
                imgPreview.style.display = 'none';
            }
            
            const authorPreview = document.getElementById('embed-author-preview');
            if (author) {
                document.getElementById('embed-author-text').textContent = author;
                if (authorIcon) document.getElementById('embed-author-icon').src = authorIcon;
                authorPreview.style.display = 'flex';
            } else {
                authorPreview.style.display = 'none';
            }
            
            const footerPreview = document.getElementById('embed-footer-preview');
            if (footer) {
                document.getElementById('embed-footer-text').textContent = footer;
                if (footerIcon) document.getElementById('embed-footer-icon').src = footerIcon;
                footerPreview.style.display = 'flex';
            } else {
                footerPreview.style.display = 'none';
            }
        }

        function setEmbedColor(color) {
            document.getElementById('embed-preview-box').style.borderLeftColor = color;
            document.querySelectorAll('.color-option').forEach(c => c.classList.remove('active'));
            event.target.classList.add('active');
        }

        function saveEmbed() {
            const embed = {
                title: document.getElementById('embed-title-input').value,
                description: document.getElementById('embed-desc-input').value,
                color: document.getElementById('embed-preview-box').style.borderLeftColor,
                image: document.getElementById('embed-image-input').value,
                author: document.getElementById('embed-author-input').value,
                footer: document.getElementById('embed-footer-input').value
            };
            
            localStorage.setItem('rox_embed', JSON.stringify(embed));
            showToast('success', 'تم حفظ الإيمبد بنجاح');
        }

        // Broadcast
        function sendBroadcast() {
            const type = document.getElementById('broadcast-type').value;
            const message = document.getElementById('broadcast-message').value;
            
            if (!message) {
                showToast('error', 'يرجى كتابة رسالة');
                return;
            }
            
            showToast('info', 'جاري إرسال الإذاعة...');
            
            setTimeout(() => {
                addLog('command', `Broadcast sent to ${type}: ${message.substring(0, 50)}...`);
                showToast('success', 'تم إرسال الإذاعة بنجاح');
                
                // Add to history
                const history = document.getElementById('broadcast-history');
                const item = document.createElement('div');
                item.style.cssText = 'padding: 15px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;';
                item.innerHTML = `
                    <div>
                        <div style="font-weight: 700; margin-bottom: 5px;">${type === 'all' ? 'الجميع' : type}</div>
                        <div style="color: var(--text-muted); font-size: 13px;">${message.substring(0, 50)}${message.length > 50 ? '...' : ''}</div>
                    </div>
                    <div style="color: var(--text-muted); font-size: 12px;">الآن</div>
                `;
                history.insertBefore(item, history.firstChild);
            }, 2000);
        }

        function previewBroadcast() {
            const message = document.getElementById('broadcast-message').value;
            alert('معاينة الرسالة:\n\n' + message);
        }

        // Logs
        function addLog(type, message) {
            const time = new Date().toLocaleTimeString('ar-SA');
            logs.push({ type, message, time });
            
            const container = document.getElementById('logs-container');
            const entry = document.createElement('div');
            entry.style.cssText = `padding: 10px; border-bottom: 1px solid var(--border); display: flex; gap: 15px; align-items: center;`;
            
            const colors = {
                error: '#ED4245',
                warn: '#FAA61A',
                info: '#5865F2',
                command: '#3BA55D'
            };
            
            entry.innerHTML = `
                <span style="color: ${colors[type] || '#96989d'}; font-weight: bold; min-width: 80px;">[${type.toUpperCase()}]</span>
                <span style="color: var(--text-muted); min-width: 80px;">${time}</span>
                <span>${message}</span>
            `;
            
            container.appendChild(entry);
            container.scrollTop = container.scrollHeight;
        }

        function filterLogs(type) {
            const entries = document.querySelectorAll('#logs-container > div');
            entries.forEach(entry => {
                if (type === 'all' || entry.textContent.includes(`[${type.toUpperCase()}]`)) {
                    entry.style.display = 'flex';
                } else {
                    entry.style.display = 'none';
                }
            });
        }

        function clearLogs() {
            document.getElementById('logs-container').innerHTML = '';
            logs = [];
        }

        // Config Editor
        function loadConfig() {
            const configText = `module.exports = {
    token: "${botConfig.token || 'YOUR_BOT_TOKEN'}",
    clientId: "${botConfig.clientId || 'CLIENT_ID'}",
    guildId: "${botConfig.guildId || 'GUILD_ID'}",
    prefix: "${botConfig.prefix || '/'}",
    owner: "${botConfig.owner || 'OWNER_ID'}",
    probot: "${botConfig.probot || 'PROBOT_ID'}",
    bank: "${botConfig.bank || 'BANK_ID'}",
    line: "${botConfig.line || 'IMAGE_URL'}",
    
    // Room IDs
    taxRoomId: "${botConfig.taxRoomId || ''}",
    suggestionRoomId: "${botConfig.suggestionRoomId || ''}",
    azkarRoomId: "${botConfig.azkarRoomId || ''}",
    azkarTime: ${botConfig.azkarTime || 30},
    logChannelId: "${botConfig.logChannelId || ''}",
    tempVoiceHubId: "${botConfig.tempVoiceHubId || ''}",
    
    // Feature Channels
    copyEmojiChannelId: "${botConfig.copyEmojiChannelId || ''}",
    copyStickerChannelId: "${botConfig.copyStickerChannelId || ''}",
    memberLogChannelId: "${botConfig.memberLogChannelId || ''}",
    modLogChannelId: "${botConfig.modLogChannelId || ''}",
    serverLogChannelId: "${botConfig.serverLogChannelId || ''}",
    
    // Log Channels
    logtickets: "${botConfig.logtickets || ''}",
    logbuy: "${botConfig.logbuy || ''}",
    Ratechannel: "${botConfig.Ratechannel || ''}",
    inforate: "${botConfig.inforate || ''}",
    panel: "${botConfig.panel || ''}",
    
    // Roles Configuration
    roles: ${JSON.stringify(botConfig.roles || [], null, 4)},
    ticketCategoryId: "${botConfig.ticketCategoryId || ''}"
};`;
            
            document.getElementById('config-editor').value = configText;
        }

        function saveConfig() {
            try {
                const configText = document.getElementById('config-editor').value;
                // Here you would normally send to server
                localStorage.setItem('rox_config_code', configText);
                showToast('success', 'تم حفظ الإعدادات');
                addLog('info', 'Configuration updated');
            } catch (e) {
                showToast('error', 'خطأ في حفظ الإعدادات');
            }
        }

        function formatConfig() {
            // Simple formatting
            showToast('info', 'تم تنسيق الكود');
        }

        // Utilities
        function showToast(type, message) {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            
            const icons = {
                success: 'check-circle',
                error: 'times-circle',
                warning: 'exclamation-triangle',
                info: 'info-circle'
            };
            
            toast.innerHTML = `
                <i class="fas fa-${icons[type]}"></i>
                <span>${message}</span>
            `;
            
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }

        function saveAllChanges() {
            // Save bot settings
            botConfig.token = document.getElementById('bot-token').value;
            botConfig.prefix = document.getElementById('bot-prefix').value;
            
            localStorage.setItem('rox_config', JSON.stringify(botConfig));
            showToast('success', 'تم حفظ جميع التغييرات بنجاح');
            addLog('info', 'All changes saved');
        }

        function restartBot() {
            if (confirm('هل أنت متأكد من إعادة تشغيل البوت؟')) {
                showToast('info', 'جاري إعادة التشغيل...');
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        }

        function resetBot() {
            if (confirm('⚠️ هل أنت متأكد؟ سيتم حذف جميع الإعدادات!')) {
                localStorage.clear();
                showToast('success', 'تم إعادة تعيين الإعدادات');
                setTimeout(() => location.reload(), 1000);
            }
        }

        function startUptime() {
            setInterval(() => {
                const diff = Math.floor((Date.now() - startTime) / 1000);
                const hours = Math.floor(diff / 3600).toString().padStart(2, '0');
                const mins = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
                const secs = (diff % 60).toString().padStart(2, '0');
                document.getElementById('uptime').textContent = `${hours}:${mins}:${secs}`;
            }, 1000);
        }

        function refreshStats() {
            document.getElementById('guilds-count').textContent = Math.floor(Math.random() * 50) + 10;
            document.getElementById('users-count').textContent = Math.floor(Math.random() * 5000) + 1000;
            document.getElementById('commands-used').textContent = Math.floor(Math.random() * 10000) + 1000;
            showToast('success', 'تم تحديث الإحصائيات');
        }

        function applyConfigToUI() {
            document.getElementById('bot-token').value = botConfig.token || '';
            document.getElementById('bot-prefix').value = botConfig.prefix || '/';
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                saveAllChanges();
            }
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                restartBot();
            }
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    </script>
</body>
</html>
ذا صح
